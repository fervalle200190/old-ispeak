import { API_URL } from "services/settings"

export default function getAllCourses() {
    const URL = `${API_URL}/Cursos/GetAll`
    return fetch(URL)
        .then(response => response.json())
        .then(response => {
            const data = response
            const courses = data.map(course => {
                const id = course.id
                const title = course.nombre
                const students = course.cantidadAlumnos
                const duration = course.duracion
                const professor = course.profesor
                return {id, title, students, duration, professor}
            })
            return courses
    })
}