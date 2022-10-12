from .models import Project, ProjectNotes
from django_filters import rest_framework


class ProjectFilter(rest_framework.FilterSet):
    project_name = rest_framework.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['project_name']


class NotesFilter(rest_framework.FilterSet):
    create = rest_framework.DateFromToRangeFilter()

    class Meta:
        model = ProjectNotes
        fields = ['project', 'datetime_created']