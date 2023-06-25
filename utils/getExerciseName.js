const getExerciseName = (id, exercises) => {

    for (let i = 0; i < exercises.length; i++) {

        if (exercises[i].id === id) {

            return exercises[i].name;

        }

    }

}

export default getExerciseName;