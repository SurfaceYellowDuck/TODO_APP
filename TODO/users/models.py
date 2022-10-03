from django.db import models
from django.contrib.auth.models import AbstractBaseUser, AbstractUser, UserManager, PermissionsMixin


class UserProfile(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        max_length=64,
        blank=False,
        unique=True,
        verbose_name='username',
    )

    first_name = models.CharField(
        max_length=64,
        blank=True,
        verbose_name='firstname'
    )

    last_name = models.CharField(
        max_length=64,
        blank=True,
        verbose_name='last name'
    )

    email = models.EmailField(
        unique=True,
        blank=False,
        verbose_name='email field',
    )

    is_staff = models.BooleanField(
        default=False,
        verbose_name='is staff'
    )

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
