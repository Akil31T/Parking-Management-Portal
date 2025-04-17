// export const API_URL = process.env.REACT_PUBLIC_API_URL || "https://use-parking-appserver.vercel.app";

import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Booking } from "../types";

export const MAX_RETRIES = 3;
export const TIMEOUT = 15000;


export const GOOGLE_API_KEY = 'AIzaSyDhI53FZUxAMvEkSDFZaMu02N6SoRsDA4s'


export const API_ENDPOINTS = {
    AdminLogin: '/admin/login',
    Profile: '/admin/profile',
    AddAdmin:'/admin',
    Owner:'/admin/property/owner',
    ownerDetail:'/admin/properties/owner',
    Customer:'/admin/customer',
    Properties:"/admin/properties",
    EditProperties:'/admin/properties/'
}

export const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
        case 'active':
            return <Clock className="h-5 w-5 text-blue-500" />;
        case 'completed':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'cancelled':
            return <XCircle className="h-5 w-5 text-red-500" />;
        default:
            return <Clock className="h-5 w-5 text-yellow-500" />;
    }
};

export const getStatusClass = (status: Booking['status']) => {
    switch (status) {
        case 'active':
            return 'bg-blue-100 text-blue-800';
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-yellow-100 text-yellow-800';
    }
};