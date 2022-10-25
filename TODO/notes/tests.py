from django.test import TestCase
import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectViewSet, ProjectNotesViewSet
from models import ProjectNotes


class TestProjectNotesViewSet:
    def test_get_notes_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/project_notes/')
        view = ProjectNotesViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
