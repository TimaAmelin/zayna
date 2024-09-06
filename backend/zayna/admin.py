from django.contrib import admin
from .models import Project


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'income')  # Columns to display in the list view
    search_fields = ('name',)  # Fields to search by
    list_filter = ('price',)  # Fields to filter by

# Register the Project model with the admin site
admin.site.register(Project, ProjectAdmin)
