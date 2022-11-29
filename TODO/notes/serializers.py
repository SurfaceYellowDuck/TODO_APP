from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Project, ProjectNotes


class ProjectSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectNotesSerializer(ModelSerializer):
    # creator = StringRelatedField(many=True)

    class Meta:
        model = ProjectNotes
        fields = '__all__'
