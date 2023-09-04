create DATABASE drone_master;
use drone_master;
-- drop DATABASE drone_master;

create TABLE user(
user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
user_name VARCHAR(50) NOT NULL,
user_lastname VARCHAR(100) NOT NULL,
email VARCHAR(200) UNIQUE NOT NULL,
password VARCHAR(150) NOT NULL,
type TINYINT(1) DEFAULT 0, -- 0 Alumno 1 Profesor 2 Admin
passport VARCHAR(25), 
address VARCHAR(250),
phone VARCHAR(20),
user_img VARCHAR(200),
is_deleted BOOLEAN DEFAULT FALSE NOT NULL
);



create TABLE resource(
resource_id BIGINT UNSIGNED PRIMARY KEY,
created_by_user_id INT UNSIGNED, -- CAMBIAR A created_by_user_id;
resource_name VARCHAR(100) NOT NULL,
resource_is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
CONSTRAINT fk_user2_id FOREIGN KEY (created_by_user_id)
REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- ALTER TABLE resource CHANGE user_id created_by_user_id INT UNSIGNED;

create TABLE category(
category_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
category_name VARCHAR(50) NOT NULL,
category_is_deleted BOOLEAN DEFAULT FALSE NOT NULL
);

create TABLE course(
course_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
category_id INT UNSIGNED,
course_name VARCHAR(100) NOT NULL,
course_description BLOB,
course_length TINYINT(4),
course_is_hidden TINYINT(1) DEFAULT 1,
price DECIMAL(7,2),
score DECIMAL(3,1) DEFAULT 0,
created_by_user_id INT UNSIGNED NOT NULL, 
counter_rating INT UNSIGNED DEFAULT 0,
CONSTRAINT fk_user_id FOREIGN KEY (created_by_user_id)
REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_category_id FOREIGN KEY (category_id)
REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE course
ADD start_date DATE;

ALTER TABLE course
ADD course_img VARCHAR(200);

ALTER TABLE course
ADD COLUMN exam_file VARCHAR(200);

create TABLE unit(
unit_id SMALLINT UNSIGNED NOT NULL,
course_id INT UNSIGNED NOT NULL,
unit_tittle VARCHAR(100) NOT NULL,
primary key (course_id, unit_id),
    CONSTRAINT fk_course_1 FOREIGN KEY (course_id)
	REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table lesson(
lesson_id SMALLINT UNSIGNED NOT NULL,
course_id INT UNSIGNED NOT NULL,
unit_id SMALLINT UNSIGNED NOT NULL,
resource_id BIGINT UNSIGNED,
lesson_title VARCHAR(100) NOT NULL,
lesson_content BLOB,
lesson_is_hidden TINYINT(1) DEFAULT 1,
    primary key (course_id, unit_id, lesson_id),
    CONSTRAINT fk_unit_2 FOREIGN KEY (course_id, unit_id)
	REFERENCES unit(course_id, unit_id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_resource_2 FOREIGN KEY (resource_id)
	REFERENCES resource(resource_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_lesson (
    user_id INT UNSIGNED NOT NULL,
    lesson_id SMALLINT UNSIGNED NOT NULL,
    course_id INT UNSIGNED NOT NULL,
    unit_id SMALLINT UNSIGNED NOT NULL,
    resource_is_downloaded BOOLEAN DEFAULT 0,
    PRIMARY KEY (user_id, course_id, unit_id, lesson_id),
    CONSTRAINT fk_user_2 FOREIGN KEY (user_id)
        REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_lesson_2 FOREIGN KEY (course_id, unit_id, lesson_id)
        REFERENCES lesson(course_id, unit_id, lesson_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create TABLE user_course(
user_id INT UNSIGNED, 
course_id INT UNSIGNED, 
status TINYINT(1) DEFAULT 1, -- 1 EN PROGRESO; 2 COMPLETADO; 3 NO SUPERADO; 4 SUPERADO;
start_date DATE , 
paid_price DECIMAL(7,2),
PRIMARY KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE CASCADE ON UPDATE CASCADE
);
    
create TABLE tag(
tag_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
tag_name VARCHAR(50) NOT NULL

);

create TABLE tag_course(
tag_id INT UNSIGNED NOT NULL,
course_id INT UNSIGNED NOT NULL,
PRIMARY KEY (course_id, tag_id),
    FOREIGN KEY (course_id) 
    REFERENCES course (course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) 
    REFERENCES tag (tag_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create TABLE comment(
parent_comment_id INT UNSIGNED DEFAULT NULL,
user_id INT UNSIGNED NOT NULL,
course_id INT UNSIGNED NOT NULL,
unit_id SMALLINT UNSIGNED NOT NULL,
lesson_id SMALLINT UNSIGNED NOT NULL,
comment_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
comment_content VARCHAR(255) NOT NULL, 
comment_is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
CONSTRAINT fk_user4_id FOREIGN KEY (user_id)
REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE, 
CONSTRAINT fk_lesson_4 FOREIGN KEY (course_id, unit_id, lesson_id)
REFERENCES lesson(course_id, unit_id, lesson_id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_comment_1 FOREIGN KEY (parent_comment_id)
REFERENCES comment(comment_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE lesson_viewed(
user_id INT UNSIGNED,
lesson_id SMALLINT UNSIGNED,
course_id INT UNSIGNED
);

CREATE TABLE student_exam(
user_id INT UNSIGNED,
course_id INT UNSIGNED,
student_exam_file VARCHAR(200)
);

 

-- Inserciones en la tabla user (15 usuarios diferentes)
INSERT INTO user (user_name, user_lastname, email, password, type)
VALUES
  ('Juan', 'Pérez', 'juan@example.com', 'contraseña1', 0),
  ('María', 'García', 'maria@example.com', 'contraseña2', 1),
  ('Carlos', 'Rodríguez', 'carlos@example.com', 'contraseña3', 0),
  ('Laura', 'López', 'laura@example.com', 'contraseña4', 0),
  ('Roberto', 'Martínez', 'roberto@example.com', 'contraseña5', 1),
  ('Ana', 'Sánchez', 'ana@example.com', 'contraseña6', 0),
  ('Luis', 'Fernández', 'luis@example.com', 'contraseña7', 0),
  ('Elena', 'Díaz', 'elena@example.com', 'contraseña8', 1),
  ('Pedro', 'Ramírez', 'pedro@example.com', 'contraseña9', 0),
  ('Carmen', 'Vargas', 'carmen@example.com', 'contraseña10', 0),
  ('Alejandro', 'Pérez', 'alejandro@example.com', 'contraseña11', 1),
  ('Isabel', 'López', 'isabel@example.com', 'contraseña12', 0),
  ('Ricardo', 'Martínez', 'ricardo@example.com', 'contraseña13', 0),
  ('Fernanda', 'García', 'fernanda@example.com', 'contraseña14', 1),
  ('Andrés', 'Sánchez', 'andres@example.com', 'contraseña15', 0);
  
   UPDATE user SET type = 2 WHERE user_id = 1;

-- Inserciones en la tabla resource (15 recursos diferentes)
INSERT INTO resource (resource_id, created_by_user_id, resource_name)
VALUES
  (1, 1, 'Guía de Introducción a Drones'),
  (2, 2, 'Tutorial de Vuelo de Drones'),
  (3, 3, 'Manual de Mantenimiento de Drones'),
  (4, 4, 'Guía de Seguridad en Vuelo de Drones'),
  (5, 5, 'Tutorial de Filmación Aérea con Drones'),
  (6, 6, 'Manual de Reparación Avanzada de Drones'),
  (7, 7, 'Libro de Regulaciones y Legalidad de Drones'),
  (8, 8, 'Recopilación de Fotos Aéreas con Drones'),
  (9, 9, 'Tutorial de Diseño de Drones Personalizados'),
  (10, 10, 'Informe sobre Normativas de Vuelo de Drones'),
  (11, 11, 'Curso en Video de Edición de Videos Aéreos'),
  (12, 12, 'Manual de Mantenimiento Preventivo de Drones'),
  (13, 13, 'Guía de Fotografía de Paisajes con Drones'),
  (14, 14, 'Tutorial de Construcción de Drones de Carreras'),
  (15, 15, 'Presentación de Casos Legales Relacionados a Drones');

-- Inserciones en la tabla category (15 categorías diferentes)
INSERT INTO category (category_name)
VALUES
  ('Vuelo de Drones'),
  ('Mantenimiento de Drones'),
  ('Fotografía Aérea con Drones'),
  ('Filmación Aérea'),
  ('Diseño y Construcción de Drones'),
  ('Regulaciones y Legalidad'),
  ('Edición de Videos Aéreos'),
  ('Seguridad en el Uso de Drones'),
  ('Normativas de Vuelo y Licencias'),
  ('Drones en la Industria Agrícola'),
  ('Drones de Carreras'),
  ('Exploración con Drones en Medio Ambiente'),
  ('Fotogrametría con Drones'),
  ('Drones y Televisión'),
  ('Drones en Rescate y Emergencias');

-- Inserciones en la tabla course (15 cursos diferentes)
INSERT INTO course (category_id, course_name, course_description, course_length, course_is_hidden, price, score, created_by_user_id)
VALUES
  (1, 'Curso de Introducción al Vuelo de Drones', 'Aprende los fundamentos del vuelo de drones.', 6, 0, 89.99, 4.5, 1),
  (2, 'Curso de Mantenimiento de Drones', 'Domina el mantenimiento y reparación de drones.', 8, 0, 129.99, 4.8, 2),
  (3, 'Curso de Fotografía Aérea con Drones', 'Captura imágenes impresionantes desde el aire.', 10, 1, 109.99, 4.6, 3),
  (4, 'Curso de Filmación Aérea Creativa', 'Descubre técnicas creativas para la filmación aérea.', 12, 0, 119.99, 4.7, 4),
  (5, 'Curso de Diseño y Construcción de Drones', 'Crea y ensambla tu propio dron personalizado.', 10, 1, 199.99, 4.9, 5),
  (6, 'Curso de Regulaciones y Legalidad en el Uso de Drones', 'Conoce las leyes y normativas para volar drones.', 8, 0, 79.99, 4.4, 6),
  (7, 'Edición Profesional de Videos Aéreos', 'Aprende a editar y mejorar tus videos grabados con drones.', 6, 0, 149.99, 4.7, 7),
  (8, 'Curso de Seguridad en el Vuelo de Drones', 'Consejos y técnicas para volar drones de manera segura.', 4, 1, 59.99, 4.2, 8),
  (9, 'Normativas y Licencias para Vuelo de Drones', 'Todo sobre los requisitos legales y licencias para volar drones.', 6, 0, 89.99, 4.3, 9),
  (10, 'Aplicaciones de Drones en la Agricultura', 'Cómo utilizar drones en la industria agrícola.', 8, 0, 109.99, 4.6, 10),
  (11, 'Curso de Drones de Carreras', 'Domina la construcción y pilotaje de drones de carreras.', 10, 1, 179.99, 4.8, 11),
  (12, 'Exploración Ambiental con Drones', 'Utiliza drones para investigar y estudiar el medio ambiente.', 8, 0, 129.99, 4.5, 12),
  (13, 'Fotogrametría y Modelado 3D con Drones', 'Crea modelos tridimensionales con fotografías aéreas.', 8, 1, 139.99, 4.7, 13),
  (14, 'Drones en la Televisión y Producción Audiovisual', 'Cómo utilizar drones en la creación de contenido audiovisual.', 6, 0, 159.99, 4.6, 14),
  (15, 'Drones en Rescate y Situaciones de Emergencia', 'Aplicaciones de drones en situaciones de rescate y emergencia.', 8, 0, 119.99, 4.4, 15);

INSERT INTO unit (unit_id, course_id, unit_tittle)
VALUES
  (1, 1, 'Introducción al Vuelo de Drones'),
  (2, 1, 'Práctica de Vuelo en Exteriores'),
  (1, 2, 'Herramientas y Repuestos Básicos para Mantenimiento'),
  (2, 2, 'Diagnóstico y Solución de Problemas Comunes'),
  (3, 2, 'Mantenimiento Avanzado de Componentes'),
  (1, 3, 'Conceptos Básicos de Fotografía Aérea'),
  (2, 3, 'Técnicas de Composición y Encuadre'),
  (3, 3, 'Edición y Retoque de Imágenes Aéreas'),
  (1, 4, 'Planificación y Preparación para Filmación Aérea'),
  (2, 4, 'Toma de Imágenes en Movimiento y Estáticas'),
  (1, 5, 'Diseño y Selección de Componentes para Drones'),
  (2, 5, 'Ensamblaje y Construcción del Dron Personalizado'),
  (1, 6, 'Normativas y Regulaciones para Vuelo de Drones'),
  (2, 6, 'Licencias y Permisos para Uso de Drones'),
  (1, 7, 'Edición Profesional de Videos Aéreos');

-- Inserciones en la tabla lesson (15 lecciones diferentes)
INSERT INTO lesson (lesson_id, course_id, unit_id, resource_id, lesson_title, lesson_is_hidden)
VALUES
 ( 1, 1, 1, 1, 'Historia y Principios Básicos de los Drones', 0),
  (2, 1, 2, 2, 'Manejo de Drones en Condiciones Adversas', 1),
  (3, 2, 1, 3, 'Mantenimiento Preventivo y Limpieza', 0),
  (4, 2, 2, 4, 'Diagnóstico y Solución de Problemas', 0),
  (5, 2, 3, 5, 'Mantenimiento Avanzado de Componentes', 0),
  (6, 3, 1, 6, 'Conceptos Básicos de Fotografía Aérea', 0),
  (7, 3, 2, 7, 'Composición y Encuadre en Fotografía Aérea', 0),
  (8, 3, 3, 8, 'Edición y Retoque de Imágenes Aéreas', 0),
  (9, 4, 1, 9, 'Planificación y Preparación para la Filmación Aérea', 0),
  (10, 4, 2, 10, 'Captura de Imágenes en Movimiento y Estáticas', 0),
  (11, 5, 1, 11, 'Selección de Componentes y Diseño de Drones', 0),
  (12, 5, 2, 12, 'Ensamblaje y Construcción del Dron Personalizado', 0),
  (13, 6, 1, 13, 'Introducción a las Regulaciones de Drones', 0),
  (14, 6, 2, 14, 'Licencias y Permisos para Vuelo de Drones', 0),
 (15, 7, 1, 15, 'Principios de Edición de Videos Aéreos', 0);

-- Inserciones en la tabla tag (15 etiquetas diferentes)
INSERT INTO tag (tag_name)
VALUES
  ('Principiantes'),
  ('Avanzado'),
  ('Fotografía Aérea'),
  ('Filmación Creativa'),
  ('Diseño DIY'),
  ('Regulaciones Legales'),
  ('Edición de Videos'),
  ('Seguridad en el Vuelo'),
  ('Licencias de Drones'),
  ('Agricultura con Drones'),
  ('Drones de Carreras'),
  ('Exploración Ambiental'),
  ('Fotogrametría 3D'),
  ('Televisión con Drones'),
  ('Rescate y Emergencias');

-- Inserciones en la tabla tag_course (15 relaciones adicionales)
INSERT INTO tag_course (tag_id, course_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 4),
  (5, 4),
  (6, 6),
  (7, 7),
  (8, 7),
  (9, 8),
  (10, 9),
  (11, 9),
  (12, 10),
  (13, 11),
  (14, 13),
  (15, 15);

-- Inserciones en la tabla comment (15 comentarios diferentes)
INSERT INTO comment (user_id, course_id, unit_id, lesson_id, comment_content)
VALUES
  (1,  1,  1,  1, '¡Gran curso para principiantes en drones!'),
  (2,  1,  2,  2, 'Me encantó la primera lección.'),
  (3,  2,  1,  3, 'Estoy emocionado por aprender sobre mantenimiento.'),
  (4,  2,  2,  4, 'Las imágenes aéreas son impresionantes.'),
  (5,  2,  3,  5, 'La planificación es clave en la filmación aérea.'),
  (6,  3,  1,  6, 'Quiero aprender más sobre captura de imágenes en movimiento.'),
  (7,  3,  2,  7, 'El diseño de drones personalizados es genial.'),
  (8,  3,  3,  8, 'Aprendí mucho sobre regulaciones y legalidad.'),
  (9,  4,  1,  9, 'Las licencias son esenciales para volar legalmente.'),
  (10, 4, 2, 10, 'La edición de videos es un arte fascinante.'),
  (11, 5,  1, 11,'La seguridad es lo primero al volar un dron.'),
  (12, 5,  2, 12, 'Normativas de vuelo son interesantes.'),
  (13, 6,  1, 13, 'Me apasiona el mundo de los drones de carreras.'),
  (14, 6,  2, 14, 'Los drones pueden tener un impacto positivo en el medio ambiente.'),
  (15, 7,  1,  15,  'Los drones son vitales en situaciones de emergencia.');

-- Inserts relacionando usuarios y cursos en progreso
INSERT INTO user_course (user_id, course_id, status, start_date, paid_price) VALUES
(1, 1, 1, '2023-08-19', 89.99),
(1, 2, 1, '2023-08-19', 129.99),
(2, 3, 1, '2023-08-19', 109.99),
(3, 4, 1, '2023-08-19', 119.99),
(4, 5, 1, '2023-08-19', 199.99),
(5, 6, 1, '2023-08-19', 79.99),
(6, 7, 1, '2023-08-19', 149.99),
(7, 8, 1, '2023-08-19', 59.99),
(8, 9, 1, '2023-08-19', 89.99),
(9, 10, 1, '2023-08-19', 109.99),
(10, 11, 1, '2023-08-19', 179.99),
(11, 12, 1, '2023-08-19', 129.99),
(12, 13, 1, '2023-08-19', 139.99),
(13, 14, 1, '2023-08-19', 159.99),
(14, 15, 1, '2023-08-19', 119.99);

INSERT INTO user_course (user_id, course_id, status, start_date, paid_price) VALUES (1, 15, 1, NOW(), 119.99);

SELECT * FROM course ;
SELECT * FROM category ;
SELECT * FROM tag_course ;
Select * from tag;
Select * from user;
Select * from user_course;
Select * from unit;
Select * from lesson;


-- Traer todos los users que pertenezcan a los cursos con id =  a los id de los cursos que tienen relacion en la tabla user_course con el user_id = 2.

SELECT DISTINCT
    user.user_id AS student_id,
    user.user_name AS student_name,
    user.user_lastname AS student_lastname,
    user.email AS student_email,
    user.phone AS student_phone,
    user.user_img AS student_img
FROM
    user
        JOIN
    user_course ON user.user_id = user_course.user_id
WHERE
    user.type = 0
        AND user.is_deleted = 0
        AND user_course.course_id IN (SELECT 
            course_id
        FROM
            user_course
        WHERE
            user_id = 16);


    
    
    


-- nombre del curso y id del curso y  el numero de los alumnos no borrados de ese curso,  ,dados un user_id(profesor);


SELECT user_course.course_id,  COUNT(user_course.user_id) AS num_students FROM user_course JOIN user ON user_course.user_id = user.user_id WHERE user.type = 0 AND user.is_deleted = FALSE AND user_course.course_id =3;
 
SELECT user_course.course_id, COUNT(user_course.user_id) AS num_students FROM user_course JOIN user ON user_course.user_id = user.user_id WHERE user.type = 0 AND user.is_deleted = FALSE AND user_course.course_id IN ( SELECT course_id FROM user_course WHERE user_id = 16 ) GROUP BY user_course.course_id;


    
    
SELECT user_course.course_id, COUNT(DISTINCT user_course.user_id) AS num_students, COUNT(DISTINCT unit.unit_id) AS num_units FROM user_course JOIN user ON user_course.user_id = user.user_id JOIN unit ON user_course.course_id = unit.course_id WHERE user.type = 0 AND user.is_deleted = FALSE AND user_course.course_id IN ( SELECT course_id FROM user_course WHERE user_id = 16 ) GROUP BY user_course.course_id;

SELECT user.* FROM user INNER JOIN user_course ON user.user_id = user_course.user_id WHERE user.is_deleted = 0 AND user.type = 0 AND user_course.course_id = 2;

SELECT user.user_name, user.user_lastname, user.phone, user.email, user_course.status, user_course.start_date FROM user INNER JOIN user_course ON user.user_id = user_course.user_id WHERE user.type = 0 AND user.is_deleted = 0 AND user_course.course_id = 3;

SELECT course.score, course.course_id, unit.unit_id, lesson.lesson_id, resource.resource_id, course.course_name, unit.unit_tittle, lesson.lesson_title from (course) JOIN unit ON unit.course_id = course.course_id JOIN lesson ON lesson.unit_id = unit.unit_id JOIN resource ON resource.resource_id = lesson.resource_id WHERE course.course_id = 3 ORDER BY unit.unit_id, lesson_id;

SELECT
  course.score AS course_score,
  course.course_id,
  unit.unit_id,
  lesson.lesson_id,
  resource.resource_id,
  course.course_name,
  unit.unit_tittle,
  lesson.lesson_title
FROM
  course
INNER JOIN
  unit ON course.course_id = unit.course_id
INNER JOIN
  lesson ON unit.course_id = lesson.course_id AND unit.unit_id = lesson.unit_id
LEFT JOIN
  resource ON lesson.resource_id = resource.resource_id
WHERE
  course.course_id = 2;
  
  Select * from lesson;
    Select start_date from user_course;


SELECT tag.tag_id, tag.tag_name FROM tag_course INNER JOIN tag ON tag_course.tag_id = tag.tag_id INNER JOIN course course ON tag_course.course_id = course.course_id WHERE course.course_is_hidden = 0 AND course.course_id = 1;

SELECT course_name, course_length, price, course_description, teacher_id, category_id, start_date, created_by_user_id FROM course WHERE course_id = 1;
SELECT
  c.*,
  u.unit_id,
  u.unit_title,
  l.lesson_id,
  l.lesson_title,
  r.resource_id
FROM
  course c
LEFT JOIN
  unit u ON c.course_id = u.course_id
LEFT JOIN
  lesson l ON u.course_id = l.course_id AND u.unit_id = l.unit_id
LEFT JOIN
  resource r ON l.resource_id = r.resource_id;
  
  
SELECT
  course.course_name,
  course.course_length,
  course.price,
  course.course_description,
  user.user_id AS teacher_id,
  course.category_id,
  course.start_date,
  course.created_by_user_id,
  tag.tag_id,
  tag.tag_name
FROM course
JOIN user_course ON course.course_id = user_course.course_id
JOIN user ON user_course.user_id = user.user_id
LEFT JOIN tag_course ON course.course_id = tag_course.course_id
LEFT JOIN tag ON tag_course.tag_id = tag.tag_id
WHERE course.course_id = 21 AND user.type != 0;

SELECT * FROM user;
SELECT * FROM user_course;
SELECT * FROM tag_course;

SELECT course.course_id,
       COUNT(DISTINCT unit.unit_id) AS total_units,
       COUNT(DISTINCT user2.user_id) AS total_users
FROM user_course
JOIN course ON user_course.course_id = course.course_id
LEFT JOIN unit ON course.course_id = unit.course_id
LEFT JOIN user_course user_course2 ON course.course_id = user_course2.course_id
LEFT JOIN user user2 ON user_course2.user_id = user2.user_id AND user2.type = 0
WHERE user_course.user_id = 46
GROUP BY course.course_id;

SELECT 
    user_course.course_id,
    COUNT(DISTINCT user_course.user_id) AS num_students,
    COUNT(DISTINCT unit.unit_id) AS num_units
FROM
    user_course
        Left JOIN
    user ON user_course.user_id = user.user_id
       Left JOIN
    unit ON user_course.course_id = unit.course_id
WHERE
    user.type = 0
        AND user.is_deleted = FALSE
        AND user_course.course_id IN (SELECT 
            course_id
        FROM
            user_course
        WHERE
            user_id = 46)
GROUP BY user_course.course_id;

SELECT c.course_id, COUNT(u.unit_id) AS total_units
FROM user_course uc
JOIN course c ON uc.course_id = c.course_id
JOIN unit u ON c.course_id = u.course_id
WHERE uc.user_id = 46
GROUP BY c.course_id;

SELECT uc.course_id, COUNT(u.user_id) AS total_users
FROM user_course uc
JOIN user u ON uc.user_id = u.user_id
WHERE uc.course_id IN (SELECT course_id FROM user_course WHERE user_id = 46)
AND u.type = 0
GROUP BY uc.course_id;

SELECT
    uc.course_id,
    COUNT(DISTINCT uc.user_id) AS num_students,
    COUNT(DISTINCT u.unit_id) AS num_units
FROM
    user_course uc
JOIN
    user u ON uc.user_id = u.user_id
JOIN
    unit u2 ON uc.course_id = u2.course_id
WHERE
	u.user_id = 46 AND
    u.type = 0
    AND u.is_deleted = FALSE
GROUP BY
    uc.course_id;
    
    SELECT c.course_id,
       COUNT(DISTINCT u.unit_id) AS total_units,
       COUNT(DISTINCT u2.user_id) AS total_users
FROM user_course uc
JOIN course c ON uc.course_id = c.course_id
LEFT JOIN unit u ON c.course_id = u.course_id
LEFT JOIN user u2 ON uc.user_id = u2.user_id AND u2.type != 1
WHERE uc.user_id = 46
GROUP BY c.course_id;

SELECT c.course_id,
       COUNT(DISTINCT u.unit_id) AS total_units,
       COUNT(DISTINCT u2.user_id) AS total_users
FROM user_course uc
JOIN course c ON uc.course_id = c.course_id
LEFT JOIN unit u ON c.course_id = u.course_id
LEFT JOIN user_course uc2 ON c.course_id = uc2.course_id
LEFT JOIN user u2 ON uc2.user_id = u2.user_id AND u2.type = 0
WHERE uc.user_id = 46
GROUP BY c.course_id;

SELECT * FROM course WHERE course_id = 21; 

SELECT course.score AS course_score, course.course_id, unit.unit_id, lesson.lesson_id, resource.resource_id, course.course_name, unit.unit_tittle, lesson.lesson_title FROM course LEFT JOIN unit ON course.course_id = unit.course_id LEFT JOIN lesson ON unit.course_id = lesson.course_id AND unit.unit_id = lesson.unit_id LEFT JOIN resource ON lesson.resource_id = resource.resource_id WHERE course.course_id = 21;

SELECT * FROM course;
SELECT * FROM user_course;

SELECT 
    course.course_id,
    course.course_img,
    course.course_name,
    course.course_length,
    course.price,
    course.course_description,
    user.user_name,
    user.user_id AS teacher_id,
    course.category_id,
    course.start_date,
    course.created_by_user_id
FROM
    course
        JOIN
    user_course ON course.course_id = user_course.course_id
        JOIN
    user ON user_course.user_id = user.user_id
WHERE
    course.course_id = 1 AND user.type != 0;


SELECT 
    course.course_id,
    course.course_img,
    course.course_name,
    course.course_length,
    course.price,
    course.course_description,
    user.user_name,
    user.user_lastname,
    user.user_id AS teacher_id,
    course.category_id,
    course.start_date,
    course.created_by_user_id
FROM
    course
        JOIN
    user_course ON course.course_id = user_course.course_id
        JOIN
    user ON user_course.user_id = user.user_id
WHERE
    course.course_id = 2 AND user.type != 0;
    
    UPDATE lesson 
SET 
    lesson_content = 'Descubre los orígenes y conceptos esenciales detrás de los drones en esta lección. Exploraremos cómo estos dispositivos han evolucionado desde su uso militar hasta convertirse en herramientas vitales en diversas industrias. Aprende los principios básicos de vuelo, la tecnología detrás de ellos y las implicaciones legales y éticas. Al final de la lección, tendrás una comprensión sólida de la historia y los fundamentos que hacen posible el vuelo de los drones en la actualidad.'
WHERE
    lesson_id = 1 AND course_id = 2;