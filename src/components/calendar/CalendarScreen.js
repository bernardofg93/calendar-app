import React, {useState} from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';



/* Cambiar las fechas a espaniol en moment*/
moment.locale('es');

const localizer = momentLocalizer(moment) // or globalizeLocalizer

//Eventos segun la documentacion para el calendario
const events = [{
    title: 'Cumpleanios del patron',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'comprar la cheve',
    user: {
        _id: '123',
        name: 'Fernando'
    }
}]

export const CalendarScreen = () => {

    /* Estado para manter la vista en donde nos quedamos
    ya se en mes semana o dia */
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        console.log(e);
    }

    const onSelectEvent = (e) => {
        console.log(e);
    }

    /* Funcion para guardar la vista en localstorage y ser enviada al estado*/
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: '#fff'
        }

        return { style }
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{ event: CalendarEvent }}
                onDoubleClick={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={ onViewChange }
                view={lastView}
            />

            <CalendarModal/>
        </div>
    )
}
