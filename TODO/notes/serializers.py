from rest_framework.serializers import ModelSerializer, SlugRelatedField
from .models import Project, ProjectNotes


class ProjectSerializer(ModelSerializer):
    users = SlugRelatedField(
        read_only=True,
        slug_field='username',
        many=True
    )

    class Meta:
        model = Project
        fields = '__all__'


class ProjectNotesSerializer(ModelSerializer):
    creator = SlugRelatedField(
            slug_field='username',
            read_only=True,
        )

    class Meta:
        model = ProjectNotes
        fields = '__all__'
