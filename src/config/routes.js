/**
 * Collection of all HTTP Endpoints to the backend
 */

// Routes Container
const routes = {};

routes.site = {
    getIndex: {
        path: "/",
        method: "get",
    },
};

routes.user = {
    isEmailUnique: {
        path: '/api/user/isEmailUnique',
        method: 'get'
    },
    isUsernameUnique: {
        path: '/api/user/isUsernameUnique',
        method: 'get'
    },
    sendVerifyAccountEmail: {
        path: '/api/user/email/verify',
        method: 'post',
    },
    sendResetPasswordEmail: {
        path: '/api/user/email/password',
        method: 'post'
    },
    authenticateVerifyAccountEmail: {
        path: '/api/user/email/verify',
        method: 'patch',
    },
    authenticateResetPasswordEmail: {
        path: '/api/user/email/password',
        method: 'patch'
    },
    resetPassword: {
        path: '/api/user/resetPassword',
        method: 'patch'
    }
}

routes.admin = {
    fetchAdmins: {
        path: ({ _id, searchByFullName }) => {
            return `/api/admin/?${!_id ? "" : `_id=${_id}`}&${!searchByFullName ? "" : `searchByFullName=${searchByFullName}`
                }`;
        },
        method: 'get'
    },
    create: {
        path: "/api/admin/create",
        method: "post",
    },
    login: {
        path: "/api/admin/login",
        method: "post",
    },
    editAccountDetails: {
        path: "/api/admin/details",
        method: "patch",
    },
    editPassword: {
        path: "/api/admin/password",
        method: "patch",
    },
    patient: {
        fetchPatients: {
            path: ({ _id, searchByFullName }) => {
                return `/api/admin/patient?${!_id ? "" : `_id=${_id}`}&${!searchByFullName ? "" : `searchByFullName=${searchByFullName}`
                    }`;
            },
            method: "get",
        },
        create: {
            path: "/api/admin/patient-create",
            method: "post",
        },
        editAccountDetails: {
            path: '/api/admin/patient-account',
            method: 'patch'
        },
        editGeneralDetails: {
            path: '/api/admin/patient-general',
            method: 'patch'
        },
        addPresentingComplaint: {
            path: '/api/admin/patient-presentingComplaint',
            method: 'post'
        },
        editPresentingComplaint: {
            path: '/api/admin/patient-presentingComplaint',
            method: 'patch'
        },
        deletePresentingComplaint: {
            path: '/api/admin/patient-presentingComplaint',
            method: 'delete'
        },
        addHistoryDetail: {
            path: '/api/admin/patient-history',
            method: 'post'
        },
        editHistoryDetail: {
            path: '/api/admin/patient-history',
            method: 'patch'
        },
        deleteHistoryDetail: {
            path: '/api/admin/patient-history',
            method: 'delete'
        },
        deletePatient: {
            path: '/api/admin/patient-delete',
            method: 'delete'
        }
    },
    logout: {
        path: "/api/admin/logout",
        method: "post",
    },
    deleteAccount: {
        path: "/api/admin/delete",
        method: "delete",
    },
};

routes.patient = {
    create: {
        path: "/api/patient/create",
        method: "post",
    },
    login: {
        path: "/api/patient/login",
        method: "post",
    },
    updateAccountDetails: {
        path: "/api/patient/accountDetails",
        method: "patch",
    },
    updateGeneralDetails: {
        path: "/api/patient/generalDetails",
        method: "patch",
    },
    editPassword: {
        path: "/api/patient/password",
        method: "patch",
    },
    addPresentingComplaint: {
        path: "/api/patient/presentingComplaint",
        method: "post",
    },
    editPresentingComplaint: {
        path: "/api/patient/presentingComplaint",
        method: "patch",
    },
    deletePresentingComplaint: {
        path: "/api/patient/presentingComplaint",
        method: "delete",
    },
    addHistoryDetail: {
        path: "/api/patient/history",
        method: "post",
    },
    editHistoryDetail: {
        path: "/api/patient/history",
        method: "patch",
    },
    deleteHistoryDetail: {
        path: "/api/patient/history",
        method: "delete",
    },
    logout: {
        path: "/api/patient/logout",
        method: "post",
    },
    deleteAccount: {
        path: "/api/patient/delete",
        method: "delete",
    },
};

routes.posts = {
    fetchPosts: {
        path: ({ postId }) => {
            return `/api/post${!postId ? "" : `?postId=${postId}`}`;
        },
        method: "get",
    },
    createNewPost: {
        path: "/api/post",
        method: "post",
    },
    editPost: {
        path: "/api/post",
        method: "patch",
    },
    deletePost: {
        path: "/api/post",
        method: "delete",
    },
};

export default routes;
