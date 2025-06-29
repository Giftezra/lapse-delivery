# Generated by Django 5.0.2 on 2025-06-27 23:38

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bankaccount',
            old_name='account_name',
            new_name='account_holder_name',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='current_location_lat',
            new_name='latitude',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='current_location_lng',
            new_name='longitude',
        ),
        migrations.RenameField(
            model_name='vehicle',
            old_name='insurance_expiry',
            new_name='insurance_expiry_date',
        ),
        migrations.RenameField(
            model_name='vehicle',
            old_name='is_verified',
            new_name='road_worthiness',
        ),
        migrations.RemoveField(
            model_name='bankaccount',
            name='account_type',
        ),
        migrations.RemoveField(
            model_name='bankaccount',
            name='swift_code',
        ),
        migrations.RemoveField(
            model_name='earnings',
            name='rider',
        ),
        migrations.RemoveField(
            model_name='earnings',
            name='session',
        ),
        migrations.RemoveField(
            model_name='order',
            name='payment_status',
        ),
        migrations.RemoveField(
            model_name='order',
            name='service_fee',
        ),
        migrations.RemoveField(
            model_name='order',
            name='subtotal',
        ),
        migrations.RemoveField(
            model_name='order',
            name='total_amount',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone_number',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_type',
        ),
        migrations.RemoveField(
            model_name='vehicle',
            name='color',
        ),
        migrations.RemoveField(
            model_name='vehicle',
            name='status',
        ),
        migrations.AddField(
            model_name='device',
            name='device_name',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='device',
            name='device_os',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='address',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='city',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='country',
            field=models.CharField(blank=True, default='United Kingdom', max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='user',
            name='postal_code',
            field=models.CharField(blank=True, max_length=12, null=True),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='insurance_provider',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='mot_documents',
            field=models.FileField(blank=True, null=True, upload_to='mot_documents/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf, '])]),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='road_worthiness_documents',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='road_worthiness_expiry_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='vehicle_type',
            field=models.CharField(choices=[('car', 'Car'), ('motorcycle', 'Motorcycle'), ('bicycle', 'Bicycle')], max_length=20),
        ),
        migrations.CreateModel(
            name='IdentityInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_type', models.CharField(blank=True, choices=[('driver_license', 'Driver License'), ('passport', 'Passport'), ('government_id', 'Government ID')], default='driver_license', max_length=20)),
                ('id_number', models.CharField(blank=True, max_length=20, null=True)),
                ('expiry_date', models.DateField(blank=True, null=True)),
                ('front_image', models.ImageField(blank=True, null=True, upload_to='identity_information/front/')),
                ('back_image', models.ImageField(blank=True, null=True, upload_to='identity_information/back/')),
                ('selfie_image', models.ImageField(blank=True, null=True, upload_to='identity_information/selfie/')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_identity_information', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Address',
        ),
    ]
