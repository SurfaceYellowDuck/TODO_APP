from rest_framework.viewsets import ModelViewSet
from .models import Project, ProjectNotes
from .serializers import ProjectSerializer, ProjectNotesSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectNotesViewSet(ModelViewSet):
    queryset = ProjectNotes.objects.all()
    serializer_class = ProjectNotesSerializer
