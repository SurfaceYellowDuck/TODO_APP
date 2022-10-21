from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, ProjectNotes
from .serializers import ProjectSerializer, ProjectNotesSerializer
from rest_framework.pagination import PageNumberPagination
from .filters import ProjectFilter, NotesFilter


class ProjectPagination(PageNumberPagination):
    page_size = 10


class NotesPagination(PageNumberPagination):
    page_size = 20


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectPagination


class ProjectNotesViewSet(ModelViewSet):

    filterset_class = NotesFilter
    queryset = ProjectNotes.objects.all()
    pagination_class = NotesPagination
    serializer_class = ProjectNotesSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)