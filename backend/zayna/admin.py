from django.contrib import admin
from .models import Project


class ProjectAdmin(admin.ModelAdmin):
    ist_display = [field.name for field in Project._meta.get_fields()]  # Columns to display in the list view
    search_fields = ('name',)  # Fields to search by

# Register the Project model with the admin site
admin.site.register(Project, ProjectAdmin)
