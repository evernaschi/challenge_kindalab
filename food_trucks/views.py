import os

import requests
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

EXT_API_TOKEN = os.environ.get("EXT_API_TOKEN")


def index(request):
    return render(request, "frontend/index.html")


class ListFoodTrucks(APIView):
    """
    View to list FoodTrucks from external API.

    """

    def get(self, request, format=None):
        """
        Return a list of FoodTrucks from external api.
        If longitude, latitude and radius are provided, only food trucks inside the circle are returned.
        """
        lng = request.query_params.get("lng")
        lat = request.query_params.get("lat")
        rad = request.query_params.get("rad")
        url = "https://data.sfgov.org/resource/rqzj-sfat.json"
        if lng and lat and rad:
            url += f"?$where=within_circle(location, {lat}, {lng}, {rad})"
        r = requests.get(
            url,
            headers={
                "X-App-Token": EXT_API_TOKEN,
            },
        )
        if r.status_code == 200:
            return Response(r.json())
        else:
            return Response({"error": "Request failed"}, status=r.status_code)
