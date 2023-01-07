import requests_mock
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class GetFoodTrucksTestCase(TestCase):
    def setUp(self):
        self.ext_api_url = "https://data.sfgov.org/resource/rqzj-sfat.json"

    @requests_mock.Mocker()
    def test_get_food_trucks(self, mock):
        """
        Ensure basic functionality with mocked external API
        """
        response_example = [
            {
                "objectid": "735318",
                "applicant": "Ziaurehman Amini",
                "facilitytype": "Push Cart",
                "cnn": "30727000",
                "locationdescription": "MARKET ST: DRUMM ST intersection",
                "address": "5 THE EMBARCADERO",
                "blocklot": "0234017",
                "block": "0234",
                "lot": "017",
                "permit": "15MFF-0159",
                "status": "REQUESTED",
                "x": "6013916.72",
                "y": "2117244.027",
                "latitude": "37.794331003246846",
                "longitude": "-122.39581105302317",
                "schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=15MFF-0159&ExportPDF=1&Filename=15MFF-0159_schedule.pdf",
                "received": "20151231",
                "priorpermit": "0",
                "expirationdate": "2016-03-15T00:00:00.000",
                "location": {
                    "latitude": "37.794331003246846",
                    "longitude": "-122.39581105302317",
                    "human_address": '{"address": "", "city": "", "state": "", "zip": ""}',
                },
                ":@computed_region_yftq_j783": "4",
                ":@computed_region_p5aj_wyqh": "1",
                ":@computed_region_rxqg_mtj9": "10",
                ":@computed_region_bh8s_q3mv": "28855",
                ":@computed_region_fyvs_ahh9": "6",
            },
        ]
        mock.get(
            self.ext_api_url,
            json=response_example,
        )
        response = self.client.get("/foodtrucks")
        assert response_example == response.data

    @requests_mock.Mocker()
    def test_get_food_trucks_circle(self, mock):
        """
        Ensure correct handling of params with mocked external API
        """
        mock.get(
            self.ext_api_url,
            status_code="200",
        )
        response = self.client.get(
            "/foodtrucks", {"lat": 37.773972, "lng": -122.431297, "rad": 1500}
        )
        self.assertTrue(status.is_success(response.status_code))

    @requests_mock.Mocker()
    def test_get_food_trucks_error_handling(self, mock):
        """
        Ensure correct handling of mocked external API errors
        """
        mock.get(
            self.ext_api_url,
            status_code="404",
        )
        response = self.client.get("/foodtrucks")
        self.assertTrue(status.is_client_error(response.status_code))

    def test_get_all_food_trucks_complete(self):
        """
        Complete test without mocking
        Ensure getting at least 1 truck in response
        """
        response = self.client.get("/foodtrucks")
        self.assertTrue(status.is_success(response.status_code))
        self.assertNotEqual(len(response.data), 0)
