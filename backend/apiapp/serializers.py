from rest_framework import serializers
from .models import *
from drf_extra_fields.fields import Base64ImageField
from geoposition.fields import GeopositionField
from geoposition import Geoposition


class ApiUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiUser
        fields = (['userId'])


class DropSerializerDebug(serializers.ModelSerializer):
    class Meta:
        model = ApiUser
        fields = (['__all__'])


class DropSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(allow_blank=False, allow_null=False, max_length=128, write_only=True)
    image = Base64ImageField(required=False, allow_null=True)

    def create(self, validated_data):
        userid = validated_data.pop('userId')
        # 'token' will be in data if successful
        drop_obj = super(DropSerializer, self).create(validated_data)
        print(drop_obj)
        creator = ApiUser.objects.get(userid=userid)
        print('---creator--')
        print(creator)
        creator.drop_created.add(drop_obj)
        creator.save()
        return drop_obj

    class Meta:
        model = Drop
        fields = (['id', 'userId', 'lat', 'lng', 'image', 'name', 'total_amount'])
        # read_only_fields = ('image', 'name')


class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = ('__all__')
