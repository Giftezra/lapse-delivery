from django.urls import path, include 
from main.views.onboarding import OnboardingView

urlpatterns = [
    path('onboarding/', OnboardingView.as_view(), name='onboarding'),
] 