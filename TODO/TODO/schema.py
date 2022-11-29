import graphene
from graphene_django import DjangoObjectType
from notes.models import ProjectNotes, Project
from users.models import UserProfile


class UserType(DjangoObjectType):
    class Meta:
        model = UserProfile
        fields = '__all__'


class NoteType(DjangoObjectType):
    class Meta:
        model = ProjectNotes
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    projects = graphene.List(ProjectType)

    def resolve_projects(root, info):
        return Project.objects.all()

    notes = graphene.List(NoteType)

    def resolve_notes(root, info):
        return ProjectNotes.object.all()

    users = graphene.List(UserType)

    def resolve_users(root, info):
        return UserProfile.objects.all()

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_by_id(root, info, id):
        try:
            return UserProfile.objects.get(id=id)
        except UserProfile.DoesNotExist:
            return None

    note_by_id = graphene.Field(NoteType, id=graphene.Int(required=True))

    def resolve_note_by_id(root, info, id):
        try:
            return ProjectNotes.objects.get(id=id)
        except ProjectNotes.DoesNotExist:
            return None

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    notes_by_author_name = graphene.List(NoteType, name=graphene.String(required=False))

    def resolve_notes_by_author_name(root, info, name=None):
        notes = ProjectNotes.objects.all()
        try:
            return notes.filter(creator__username=name)
        except ProjectNotes.DoesNotExist:
            return notes

    projects_by_author_name = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_projects_by_author_name(root, info, name=None):
        projects = Project.objects.all()
        try:
            user = UserProfile.objects.get(username=name)
            return projects.filter(users=user.pk)
        except Project.DoesNotExist or UserProfile.DoesNotExis:
            return projects


class CreateUserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        user = UserProfile.objects.create(**kwargs)
        return cls(user=user)


class UpdateUserMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        username = graphene.String(required=False)
        password = graphene.String(required=False)
        email = graphene.String(required=False)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        try:
            user = UserProfile.objects.get(pk=kwargs.get("id"))
        except UserProfile.DoesNotExist:
            return None
        username = kwargs.get('username')
        first_name = kwargs.get('first_name')
        last_name = kwargs.get('last_name')
        email = kwargs.get('email')
        if username is not None:
            user.username = username
        if first_name is not None:
            user.first_name = first_name
        if last_name is not None:
            user.last_name = last_name
        if email is not None:
            user.email = email
        user.save()
        return cls(user=user)


class DeleteUserMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    users = graphene.List(UserType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        try:
            user = UserProfile.objects.get(pk=kwargs.get('id'))
        except UserProfile.DoesNotExist:
            return None
        user.delete()
        return cls(users=UserProfile.objects.all())


class Mutation(graphene.ObjectType):
    create_user = CreateUserMutation.Field()
    update_user = UpdateUserMutation.Field()
    delete_user = DeleteUserMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
