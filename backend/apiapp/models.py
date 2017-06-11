import uuid

from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.utils import timezone


class Filter(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    MALE = 0
    FEMALE = 1
    BOTH = 2
    GENDER = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE'),
        (BOTH, 'BOTH'),
    )

    gender = models.IntegerField(choices=GENDER, default=0)
    max_age = models.IntegerField(default=100)
    min_age = models.IntegerField(default=0)
    # TODO LIKES


class Drop(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    filter = models.ForeignKey(Filter, null=True, blank=True)
    lat = models.FloatField(default=0.0)
    lng = models.FloatField(default=0.0)
    image = models.ImageField(upload_to='drop_image', height_field=None, width_field=None, max_length=100, null=True, blank=True)
    name = models.CharField(max_length=128, default='')
    total_amount = models.IntegerField(default=0)
    from_date = models.DateTimeField(default=None, null=True, blank=True)
    to_date = models.DateTimeField(default=None, null=True, blank=True)

    def __str__(self):
        return '{},{},{}'.format(self.name, self.lat, self.lng)


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = ApiUser(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, **extra_fields)

class UserDrop(models.Model):
    user = models.ForeignKey(ApiUser, on_delete=models.CASCADE)
    drop = models.ForeignKey(Drop, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now, null=True, blank=True)


class FoundDrop(models.Model):
    user = models.ForeignKey(ApiUser, on_delete=models.CASCADE)
    drop = models.ForeignKey(Drop, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now, null=True, blank=True)

class ApiUser(models.Model):
    userId = models.CharField(max_length=255, unique=True, primary_key=True, editable=True)
    drop_created = models.ManyToManyField(Drop, related_name='creator', blank=True)
    drop_received = models.ManyToManyField(Drop, related_name='receiver', blank=True, through='UserDrop')
    drop_found = models.ManyToManyField(Drop, related_name='founder', blank=True, through='FoundDrop')

    def __str__(self):
        return self.userId
