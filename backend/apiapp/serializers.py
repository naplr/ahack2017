from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from .models import *


class UnixEpochDateField(serializers.DateTimeField):
    def to_representation(self, value):
        """ Return epoch time for a datetime object or ``None``"""
        import time
        try:
            return int(time.mktime(value.timetuple()))
        except (AttributeError, TypeError):
            return None

    def to_internal_value(self, value):
        import datetime
        return datetime.datetime.fromtimestamp(int(value))


class ApiUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiUser
        fields = (['userId'])


class DropSerializerDebug(serializers.ModelSerializer):
    from_date = UnixEpochDateField()
    to_date = UnixEpochDateField()

    class Meta:
        model = Drop
        fields = (['id', 'lat', 'lng', 'image', 'name', 'total_amount', 'creator', 'receiver', 'from_date', 'to_date'])


class DropSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(allow_blank=False, allow_null=False, max_length=128, write_only=True)
    image = Base64ImageField(required=False, allow_null=True)
    from_date = UnixEpochDateField(allow_null=True)
    to_date = UnixEpochDateField(allow_null=True)
    creator = serializers.SerializerMethodField()

    def get_creator(self, obj):
        return obj.creator.first().userId

    def create(self, validated_data):
        userId = validated_data.pop('userId')
        drop_obj = super(DropSerializer, self).create(validated_data)
        print(userId)
        creator = ApiUser.objects.get(userId=userId)
        creator.drop_created.add(drop_obj)
        creator.save()
        return drop_obj

    class Meta:
        model = Drop
        fields = (['name', 'id', 'userId', 'lat', 'lng', 'image', 'total_amount', 'from_date', 'to_date', 'creator'])


class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = ('__all__')
