# 🛠️ Guía de Instalación - Curso MongoDB

<div style="background: linear-gradient(135deg, #4DB33D 0%, #3F9A2F 100%); padding: 20px; border-radius: 10px; color: white;">
  <h2 style="margin: 0;">🔧 Instalación Paso a Paso</h2>
  <p style="margin: 10px 0 0 0;">Todo lo necesario para el curso de 3 días</p>
</div>

## 📋 Lista de Verificación Previa

Antes de comenzar, verifica que tengas:
- [ ] **Windows 10/11** (64-bit)
- [ ] **Conexión a internet** estable
- [ ] **Mínimo 8GB RAM** recomendado
- [ ] **5GB de espacio libre** en disco
- [ ] **Permisos de administrador** en tu máquina

## 🚀 Instalación de Node.js

### Paso 1: Descargar Node.js
1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador `.msi`

### Paso 2: Verificar Instalación
```cmd
# Abrir Command Prompt y verificar
node --version
npm --version
```

**Resultado esperado:**
```
v18.17.0 (o superior)
9.6.7 (o superior)
```

---

## 🍃 Instalación de MongoDB

### Paso 1: Descargar MongoDB Community Server
1. Ve a [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Selecciona:
   - **Version**: 7.0.x (Current)
   - **Platform**: Windows
   - **Package**: msi
3. Descargar el archivo

### Paso 2: Instalación
1. **Ejecutar el instalador** `mongodb-windows-x86_64-7.0.x.msi`
2. Seguir el asistente:
   - ✅ **Complete** installation
   - ✅ **Install MongoDB as a Service**
   - ✅ **Run service as Network Service user**
   - ✅ **Install MongoDB Compass** (GUI)

### Paso 3: Configuración Post-Instalación

#### Crear Directorios de Datos
```cmd
# Abrir Command Prompt como Administrador
mkdir C:\data\db
mkdir C:\data\log
```

#### Agregar MongoDB al PATH
1. Abrir **Variables de Entorno**
2. Agregar a PATH: `C:\Program Files\MongoDB\Server\7.0\bin`

### Paso 4: Verificar Instalación
```cmd
# Verificar MongoDB Server
mongod --version

# Verificar MongoDB Shell
mongosh --version

# Verificar que el servicio está corriendo
net start | findstr MongoDB
```

### Paso 5: Primera Conexión
```cmd
# Conectar al shell de MongoDB
mongosh

# Deberías ver algo como:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/?directConnection=true
# test>
```

---

## 🖥️ Instalación de MongoDB Compass

Si no se instaló automáticamente:

### Paso 1: Descargar
1. Ve a [mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
2. Descargar para Windows

### Paso 2: Instalar y Configurar
1. Ejecutar el instalador
2. Abrir MongoDB Compass
3. Conectar a `mongodb://localhost:27017`

---

## 🗄️ Instalación de MySQL (Para el Día 3)

### Paso 1: Descargar MySQL
1. Ve a [dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Descargar **MySQL Community Server**
3. Seleccionar **Windows (x86, 64-bit), MSI Installer**

### Paso 2: Instalación
1. Ejecutar el instalador MSI
2. Seleccionar **Developer Default**
3. Configurar:
   - **Root Password**: Crear una contraseña segura
   - **MySQL User**: Crear usuario para desarrollo
   - **Windows Service**: ✅ Instalar como servicio

### Paso 3: MySQL Workbench
1. Se instala automáticamente con MySQL
2. Abrir MySQL Workbench
3. Conectar a `localhost:3306`

### Paso 4: Verificar
```cmd
# En Command Prompt
mysql --version

# Conectar a MySQL
mysql -u root -p
```

---

## 👨‍💻 Configuración del Editor de Código

### Visual Studio Code (Recomendado)

#### Instalación
1. Descargar desde [code.visualstudio.com](https://code.visualstudio.com/)
2. Instalar con configuración por defecto

#### Extensiones Recomendadas
```
# Instalar estas extensiones:
- MongoDB for VS Code
- MySQL (by Jun Han)
- JavaScript (ES6) code snippets
- Prettier - Code formatter
- GitLens
- Thunder Client (para testing APIs)
```

#### Configuración MongoDB Extension
1. Instalar **MongoDB for VS Code**
2. Conectar a `mongodb://localhost:27017`
3. Explorar bases de datos desde el panel lateral

---

## 📦 Dependencias del Proyecto

### Crear Carpeta de Trabajo
```cmd
mkdir C:\curso-mongodb
cd C:\curso-mongodb
```

### Dependencias Globales
```cmd
# Instalar herramientas globales útiles
npm install -g nodemon
npm install -g json-server
npm install -g http-server
```

### Verificar Todo Funciona

#### Test MongoDB
```cmd
# Conectar a MongoDB
mongosh

# Crear una base de datos de prueba
use testDB

# Insertar un documento
db.test.insertOne({nombre: "Curso MongoDB", fecha: new Date()})

# Verificar
db.test.find()

# Salir
exit
```

#### Test MySQL
```cmd
# Conectar a MySQL
mysql -u root -p

# Crear base de datos de prueba
CREATE DATABASE testDB;
USE testDB;

# Crear tabla
CREATE TABLE test (id INT PRIMARY KEY, nombre VARCHAR(50));

# Insertar datos
INSERT INTO test VALUES (1, 'Curso MongoDB');

# Verificar
SELECT * FROM test;

# Salir
exit
```

#### Test Node.js
```cmd
# Crear archivo de prueba
echo console.log("Node.js funcionando!"); > test.js

# Ejecutar
node test.js

# Resultado esperado: Node.js funcionando!
```

---

## 🔧 Solución de Problemas Comunes

### MongoDB no inicia
```cmd
# Verificar estado del servicio
sc query MongoDB

# Iniciar manualmente
net start MongoDB

# Si falla, verificar logs en:
# C:\Program Files\MongoDB\Server\7.0\log\mongod.log
```

### Error de permisos en MongoDB
```cmd
# Ejecutar Command Prompt como Administrador
# Dar permisos a las carpetas de datos
icacls C:\data\db /grant Users:F
icacls C:\data\log /grant Users:F
```

### MySQL no conecta
```cmd
# Verificar servicio MySQL
net start | findstr MySQL

# Iniciar si está parado
net start MySQL80

# Verificar puerto
netstat -an | findstr :3306
```

### Node.js no reconocido
1. Reiniciar Command Prompt después de la instalación
2. Verificar que Node.js esté en el PATH
3. Reinstalar Node.js si es necesario

---

## ✅ Checklist Final de Instalación

- [ ] **Node.js** instalado y funcionando
- [ ] **npm** disponible y actualizado
- [ ] **MongoDB Server** corriendo como servicio
- [ ] **MongoDB Shell (mongosh)** conecta correctamente
- [ ] **MongoDB Compass** conecta a localhost:27017
- [ ] **MySQL Server** instalado y corriendo
- [ ] **MySQL Workbench** conecta a localhost:3306
- [ ] **Visual Studio Code** con extensiones MongoDB y MySQL
- [ ] **Carpeta de trabajo** creada y lista
- [ ] **Dependencias globales** instaladas
- [ ] **Tests básicos** completados exitosamente

---

<div style="background-color: #4DB33D; padding: 15px; border-radius: 5px; color: white; text-align: center;">
  <strong>🎉 ¡Instalación Completa!</strong><br>
  Ya estás listo para comenzar el curso de MongoDB
</div>

## 📞 Soporte

Si tienes problemas durante la instalación:

1. **Revisar logs** de cada aplicación
2. **Verificar requisitos** del sistema
3. **Consultar documentación oficial**
4. **Buscar en Stack Overflow** con mensajes de error específicos

### Enlaces de Soporte Oficial
- [MongoDB Installation Guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MySQL Installation Guide](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html)
