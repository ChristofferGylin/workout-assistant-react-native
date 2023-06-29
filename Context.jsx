import { createContext, useEffect, useState } from "react";
import { defaultExercises } from "./data/exercises";
import { defaultSessions } from "./data/sessions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultSchedule from "./data/defaultSchedule";
import uuid from 'react-native-uuid';

const Context = createContext()

let firstRender = true;

const getData = async (key, setter, defaultValue) => {

    try {

        const jsonValue = await AsyncStorage.getItem(key);

        if (jsonValue != null) {

            const value = await JSON.parse(jsonValue);
            setter(value);

        } else {

            if (defaultValue) {

                setter(defaultValue);

            }

        }

    } catch (e) {

        console.log(e);

    }

}

const storeData = async (key, value, callback) => {

    try {

        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);

        if (callback) {
            callback();
        }

    } catch (e) {

        console.log(e);

    }

}

const sortFunction = (a, b) => {

    if (a.name < b.name) {

        return -1;

    } else if (a.name > b.name) {

        return 1;

    } else {

        return 0;

    }

}

const ContextProvider = ({ children }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const [stockExercises, setStockExercises] = useState(defaultExercises);
    const [exercises, setExercises] = useState([]);
    const [userExercises, setUserExercises] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [schedule, setSchedule] = useState(defaultSchedule);
    const [nextSession, setNextSession] = useState(0);
    const [thisSession, setThisSession] = useState();
    const [history, setHistory] = useState([]);

    useEffect(() => {

        if (firstRender) {
            firstRender = false;
            getData('schedule', setSchedule);
            getData('nextSession', setNextSession);
            getData('sessions', setSessions, defaultSessions);
            getData('userExercises', setUserExercises);
            getData('history', setHistory);
        }

    }, [])

    useEffect(() => {

        const allExercises = [...stockExercises, ...userExercises];

        allExercises.sort((a, b) => sortFunction(a, b))

        setExercises(allExercises);

    }, [stockExercises, userExercises])


    const toggleMenu = () => {

        setMenuVisible(value => !value);

    };


    const addExercise = (exercise) => {


        setUserExercises(oldExercises => {

            const newUserExercises = [...oldExercises, exercise];
            storeData('userExercises', newUserExercises);
            return newUserExercises;
        });

    };

    const deleteExercise = (id) => {

        setUserExercises(oldExercises => {

            const newUserExercises = [...oldExercises];
            const filtered = newUserExercises.filter(exercise => exercise.id !== id)
            storeData('userExercises', filtered);
            return filtered;
        });

    };

    const addSession = (session) => {

        setSessions(oldSessions => {

            const newSessions = [...oldSessions, session];
            storeData('sessions', newSessions);
            return newSessions;
        });

    };
    const deleteSession = (id) => {

        setSessions(oldSessions => {

            const newSessions = [...oldSessions];
            const filtered = newSessions.filter(session => session.id !== id)


            storeData('sessions', filtered);
            return filtered;
        });

    };
    const removeFromSchedule = (id, index) => {

        setSchedule(oldSchedule => {

            const newSchedule = [...oldSchedule];

            if (newSchedule[index] === id) {

                newSchedule.splice(index, 1)

            }

            storeData('schedule', newSchedule);
            return newSchedule;
        });

    };

    const addToSchedule = (id) => {

        setSchedule(oldSchedule => {

            const newSchedule = [...oldSchedule, id];
            storeData('schedule', newSchedule);

            return newSchedule;
        });

    };
    const addToSession = (sessionId, exercise) => {

        setSessions(oldSessions => {

            const newSessions = [...oldSessions];

            for (let i = 0; i < newSessions.length; i++) {

                if (newSessions[i].id === sessionId) {

                    newSessions[i].exercises.push(exercise);
                    break;

                }

            }

            storeData('sessions', newSessions);
            return newSessions;
        });

    };

    const updateNextSession = (add) => {

        setNextSession(next => {

            let newNext = next;

            if (add) {
                newNext++;

                if (newNext > schedule.length - 1) {

                    newNext = 0;

                }
            } else {

                if (newNext > schedule.length - 1) {

                    newNext--;

                }

            }

            storeData('nextSession', newNext);

            return newNext;

        })

    }

    const addToHistory = (post) => {

        setHistory(oldHistory => {
            const newHistory = [...oldHistory, post];

            storeData('history', newHistory, () => { getData('history', setHistory) });

        })

    }

    const updateThisSession = (session) => {

        setThisSession(session);

    }

    const increaseWeight = (sessionId, exerciseId) => {

        setSessions(oldSessions => {

            const newSessions = [...oldSessions];

            for (let i = 0; i < newSessions.length; i++) {

                if (newSessions[i].id === sessionId) {

                    let foundIt = false;

                    for (let j = 0; j < newSessions[i].exercises.length; j++) {

                        if (newSessions[i].exercises[j].id === exerciseId) {

                            newSessions[i].exercises[j].weight += newSessions[i].exercises[j].increment;
                            foundIt = true;
                            break;

                        }

                    }

                    if (foundIt) {

                        break;

                    }
                }
            }

            storeData('sessions', newSessions);
            return newSessions;
        });

    };

    return (
        <Context.Provider value={{
            menuVisible,
            toggleMenu,
            exercises,
            userExercises,
            addExercise,
            sessions,
            addSession,
            nextSession,
            deleteSession,
            addToSchedule,
            removeFromSchedule,
            schedule,
            addToSession,
            deleteExercise,
            updateNextSession,
            updateThisSession,
            thisSession,
            history,
            addToHistory,
            increaseWeight,

        }}
        >
            {children}
        </Context.Provider>
    )

}

export { Context, ContextProvider }