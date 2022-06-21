function addCourseInputs() {
    // const courseNameInput = document.querySelector('#course-name');
    const programmeForm = document.forms[0]
    const courseContainer = document.querySelector('#courses-container');
    const addCourseBtn = document.querySelector('#add-course-btn');

    // Prevent default submitting behaviour.
    // programmeForm.addEventListener('submit', function (e) {
    //     e.preventDefault();
    // })

    addCourseBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const inputs = courseContainer.getElementsByTagName('input');

        if (inputs.length < 5) {
            const newCourse = document.createElement('input');
            newCourse.name = 'coursename'
            newCourse.placeholder = 'Course Name'
            newCourse.className = 'form-control form-courses'
            courseContainer.appendChild(newCourse)
        }
    })
}

window.addEventListener('load', addCourseInputs)