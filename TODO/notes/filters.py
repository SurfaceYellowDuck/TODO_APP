from .models import Project
from django_filters import rest_framework


class ProjectFilter(rest_framework.FilterSet):
    project_name = rest_framework.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['project_name']