from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectNotesViewSet

app_name = 'notes'
router = DefaultRouter()
router.register('projects', ProjectViewSet)
router.register('project_notes', ProjectNotesViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]