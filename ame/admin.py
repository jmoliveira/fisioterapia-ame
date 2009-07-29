from django.contrib import admin
from models import Paciente

class PacienteInline(admin.TabularInline):
    model = Paciente

class PacienteAdmin(admin.ModelAdmin):
    list_display = ('nome','email')
    search_fields = ('nome',)
    fieldsets = (
        (None,
           {'fields': ('nome', 'sexo', 'data_nascimento', 'email')}
        ),
        (u'Endereco',
           {'fields': ('endereco', 'complemento', 'bairro', 'municipio', 'estado', 'cep', 'telefone', 'celular'), 
            'classes': ['collapse']}
        ),
     )
    
        
admin.site.register(Paciente, PacienteAdmin)

