from django.urls import path

from .views import (
    EmployeeListCreateAPIView,
    EmployeeRetrieveAPIView,
    EmployeeUpdateAPIView,
    EmployeeDeleteAPIView,
)

urlpatterns = [
    # List & Create
    path("", EmployeeListCreateAPIView.as_view(), name="employee-list-create"),

    # Retrieve
    path("<int:pk>/", EmployeeRetrieveAPIView.as_view(), name="employee-detail"),

    # Update
    path("<int:pk>/update/", EmployeeUpdateAPIView.as_view(), name="employee-update"),

    # Delete
    path("<int:pk>/delete/", EmployeeDeleteAPIView.as_view(), name="employee-delete"),
]