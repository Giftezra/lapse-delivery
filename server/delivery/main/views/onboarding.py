from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from main.models import User, BankAccount, Vehicle, IdentityInformation

class OnboardingView(APIView):
    def post(self, request):
        print(request.data)
        try:
        # Get the credentials from the request
            personal_info = request.data.get("personalInfo")
            bank_info = request.data.get("bankInfo")
            vehicle_info = request.data.get("vehicleInfo")
            identity_info = request.data.get("identityInfo")

            # For each of the credentials, create an object of the model to handle the data.
            # First, Create the user object using the personal_info
            user = User.objects.create_user(
                first_name=personal_info.get("first_name"),
                last_name=personal_info.get("last_name"),
                dob=personal_info.get("dob"),
                gender=personal_info.get("gender"),
                email=personal_info.get("email"),
                phone=personal_info.get("phoneNumber"),
                address=personal_info.get("address"),
                city=personal_info.get("city"),
                postal_code=personal_info.get("postal_code"),
                country=personal_info.get("country"),
                password=personal_info.get("password"),
            )
            user.save()

            # Create the bank account object using the bank_info
            bank_account = BankAccount.objects.create(
                user=user,
                bank_name=bank_info.get("bankName"),
                account_number=bank_info.get("accountNumber"),
                account_holder_name=bank_info.get("accountHolderName"),
                iban=bank_info.get("iban"),
                bic=bank_info.get("bic"),
                is_verified=False,
            )
            bank_account.save()

            # Create the identity form
            identity = IdentityInformation.objects.create(
                user=user,
                id_type=identity_info.get("idType"),
                id_number=identity_info.get("idNumber"),
                expiry_date=identity_info.get("expiryDate"),
                front_image=identity_info.get("frontImage"),
                back_image=identity_info.get("backImage"),
                selfie_image=identity_info.get("selfieImage"),
            )
            identity.save()

            # If the vehicle type is not bicycle, create the vehicle form
            if vehicle_info.get("vehicleType") != "bicycle":
                road_worthiness = vehicle_info.get("roadWorthy")
                vehicle = Vehicle.objects.create(
                    user=user,
                    vehicle_type=vehicle_info.get("vehicleType"),
                    registration_number=vehicle_info.get("registrationNumber"),
                    make=vehicle_info.get("make"),
                    model=vehicle_info.get("model"),
                    year=vehicle_info.get("year"),
                    insurance_number=vehicle_info.get("insuranceNumber"),
                    insurance_provider=vehicle_info.get("insuranceProvider"),
                    insurance_expiry_date=vehicle_info.get("insuranceExpiryDate"),
                    is_road_worthy=road_worthiness.get("isRoadWorthy"),
                    last_inspection_date=road_worthiness.get("lastInspectionDate"),
                    next_inspection_date=road_worthiness.get("nextInspectionDate"),
                    mot_documents=vehicle_info.get("documents"),
                )
                vehicle.save()

            return Response({"message": "Onboarding completed successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

