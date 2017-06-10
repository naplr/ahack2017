# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-10 15:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ApiUser',
            fields=[
                ('userId', models.CharField(max_length=255, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Drop',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('lat', models.FloatField(default=0.0)),
                ('lng', models.FloatField(default=0.0)),
                ('image', models.ImageField(blank=True, null=True, upload_to='drop_image')),
                ('name', models.CharField(default='', max_length=128)),
                ('total_amount', models.IntegerField(default=0)),
                ('from_date', models.DateTimeField(blank=True, default=None, null=True)),
                ('to_date', models.DateTimeField(blank=True, default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Filter',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('gender', models.IntegerField(choices=[(0, 'MALE'), (1, 'FEMALE'), (2, 'BOTH')], default=0)),
                ('max_age', models.IntegerField(default=100)),
                ('min_age', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='UserDrop',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True)),
                ('drop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apiapp.Drop')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apiapp.ApiUser')),
            ],
        ),
        migrations.AddField(
            model_name='drop',
            name='filter',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='apiapp.Filter'),
        ),
        migrations.AddField(
            model_name='apiuser',
            name='drop_created',
            field=models.ManyToManyField(blank=True, related_name='creator', to='apiapp.Drop'),
        ),
        migrations.AddField(
            model_name='apiuser',
            name='drop_received',
            field=models.ManyToManyField(blank=True, related_name='receiver', through='apiapp.UserDrop', to='apiapp.Drop'),
        ),
    ]
