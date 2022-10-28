import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectViewSet, ProjectNotesViewSet
from .models import ProjectNotes


class TestProjectNotesViewSet(TestCase):
    def test_get_notes_list(self):
        factory = APIRequestFactory(enforce_csrf_checks=True)
        request = factory.get('/api/project_notes/')
        view = ProjectNotesViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectListViewSet(APITestCase):
    def test_get_projects_list(self):
        response = self.client.get('/api/projects')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
