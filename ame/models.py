from django.db import models

class Paciente(models.Model):
    SEXOS = (('F', 'Feminino'), ('M', 'Masculino'))
    
    nome = models.CharField(verbose_name="Nome Completo", max_length=50,  null=True,  blank=False)
    sexo = models.CharField(verbose_name="Sexo",  max_length=1, choices=SEXOS)
    data_nascimento  = models.DateField(verbose_name="Data de nascimento",  null=True,  blank=True)
    email = models.EmailField(verbose_name="E-mail", max_length=100,  null=True,  blank=True)
    
    endereco = models.CharField(verbose_name="Endereco", max_length=255, null=True, blank=True)
    complemento = models.CharField(verbose_name="Complemento", max_length=255, null=True, blank=True)
    bairro = models.CharField(verbose_name="Bairro", max_length=150, null=True, blank=True)
    municipio = models.CharField(verbose_name="Municipio", max_length=200, null=True, blank=True)
    pais = models.ForeignKey("Pais")
    estado = models.ForeignKey("Estado")
    cep = models.CharField(verbose_name="CEP", max_length=10, null=True, blank=True)
    telefone = models.CharField(verbose_name="Telefone", max_length=15, null=True, blank=True)
    celular = models.CharField(verbose_name="Celular", max_length=15, null=True, blank=True)

    
    def __unicode__(self):
        return self.nome



class Estado(models.Model):
   pais = models.ForeignKey("Pais")
   nome = models.CharField(verbose_name="Nome", max_length=70, null=True, blank=False)
   uf = models.CharField(verbose_name="UF", max_length=2, null=True, blank=False)
   
   def __unicode__(self):
        return self.nome

class Pais(models.Model):
   nome = models.CharField(verbose_name="Nome", max_length=70, null=True, blank=False)
   
   def __unicode__(self):
        return self.nome

   