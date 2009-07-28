from django.db import models

class Paciente(models.Model):
    SEXOS = (('F', 'Feminino'), ('M', 'Masculino'))
    ESTADOS = (('PE', 'Pernambuco'), ('RJ', 'Rio de Janeiro'))
    
    nome = models.CharField(verbose_name="Nome Completo", max_length=50,  null=True,  blank=False)
    sexo = models.CharField(verbose_name="Sexo",  max_length=1, choices=SEXOS)
    data_nascimento  = models.DateField(verbose_name="Data de nascimento",  null=True,  blank=True)
    email = models.EmailField(verbose_name="E-mail", max_length=100,  null=True,  blank=True)
    endereco = models.CharField(verbose_name="Endereco", max_length=255, null=True, blank=False)
    complemento = models.CharField(verbose_name="Complemento", max_length=255, null=True, blank=False)
    bairro = models.CharField(verbose_name="Bairro", max_length=150, null=True, blank=False)
    municipio = models.CharField(verbose_name="Municipio", max_length=200, null=True, blank=False)
    estado = models.CharField(verbose_name="UF", max_length=1, choices=ESTADOS)
    cep = models.CharField(verbose_name="CEP", max_length=10, null=True, blank=False)
    telefone = models.CharField(verbose_name="Telefone", max_length=15, null=True, blank=False)
    celular = models.CharField(verbose_name="Celular", max_length=15, null=True, blank=False)

    
    def __unicode__(self):
        return self.nome
