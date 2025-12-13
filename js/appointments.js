import { db } from './firebase-config.js';
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

/**
 * Creates a new appointment
 * @param {string} userId - ID of the patient
 * @param {string} doctorName - Name of the doctor (or specialty for now)
 * @param {string} date - Date string (YYYY-MM-DD)
 * @param {string} time - Time string (HH:MM)
 * @param {string} reason - Reason for the visit
 * @returns {Promise<Object>} - Result object {success: boolean, id: string, error: string}
 */
export async function createAppointment(userId, doctorName, date, time, reason) {
    try {
        const appointmentData = {
            patientId: userId,
            doctorName: doctorName,
            date: date,
            time: time,
            reason: reason,
            status: "scheduled",
            createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, "appointments"), appointmentData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating appointment:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Retrieves appointments for a specific user
 * @param {string} userId - ID of the patient
 * @returns {Promise<Object>} - Result object {success: boolean, appointments: Array, error: string}
 */
export async function getUserAppointments(userId) {
    try {
        const q = query(
            collection(db, "appointments"),
            where("patientId", "==", userId)
            // Note: Composite index might be needed for orderBy combined with where
            // orderBy("date", "desc") 
        );

        const querySnapshot = await getDocs(q);
        const appointments = [];

        querySnapshot.forEach((doc) => {
            appointments.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Client-side sorting to avoid index creation issues during demo
        appointments.sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time);
            const dateB = new Date(b.date + 'T' + b.time);
            return dateB - dateA;
        });

        return { success: true, appointments };
    } catch (error) {
        console.error("Error getting appointments:", error);
        return { success: false, error: error.message };
    }
}
