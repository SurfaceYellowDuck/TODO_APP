from django.db import models
from users.models import UserProfile


class Project(models.Model):
    project_name = models.CharField(
        blank=False,
        max_length=65,
        verbose_name='project name'
    )

    project_repo = models.URLField(
        verbose_name='link to project repository',
        blank=True
    )

    users = models.ManyToManyField(
        UserProfile,
        verbose_name='Users in project',
    )

    def __str__(self):
        return self.project_name


class ProjectNotes(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )

    text = models.CharField(
        max_length=256,
        blank=False
    )

    creator = models.ManyToManyField(
        UserProfile
    )
    datetime_created = models.DateTimeField(
        auto_now_add=True,
        auto_now=False,
        blank=False,
        verbose_name='Date and time note created'
    )

    datetime_updated = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        blank=False,
        verbose_name='Date and time note updated'
    )

    is_active = models.BooleanField(
        default=True,
        blank=False
    )

    def __str__(self):
        return self.text
