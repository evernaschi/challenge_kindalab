from django.urls import path

from . import views

urlpatterns = [
    path("", views.index),
    path("foodtrucks", views.ListFoodTrucks.as_view()),
]
