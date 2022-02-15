/**
 * Collection of all HTTP Endpoints to the backend
 */

// Routes Container
const routes = {};

routes.site = {
    getIndex: {
        url: "/",
        method: "get",
    },
};

routes.user = {
    isEmailUnique: {
        url: '/api/user/isEmailUnique',
        method: 'get'
    },
    isUsernameUnique: {
        url: '/api/user/isUsernameUnique',
        method: 'get'
    },
    sendVerifyAccountEmail: {
        url: '/api/user/email/verify',
        method: 'post',
    },
    sendResetPasswordEmail: {
        url: '/api/user/email/password',
        method: 'post'
    },
    authenticateVerifyAccountEmail: {
        url: '/api/user/email/verify',
        method: 'patch',
    },
    authenticateResetPasswordEmail: {
        url: '/api/user/email/password',
        method: 'patch'
    },
    resetPassword: {
        url: '/api/user/resetPassword',
        method: 'patch'
    }
}

routes.admin = {
    fetchAdmins: {
        url: ({ _id, searchByFullName }) => {
            return `/api/admin/?${!_id ? "" : `_id=${_id}`}&${!searchByFullName ? "" : `searchByFullName=${searchByFullName}`
                }`;
        },
        method: 'get'
    },
    create: {
        url: "/api/admin/create",
        method: "post",
    },
    login: {
        url: "/api/admin/login",
        method: "post",
    },
    editAccountDetails: {
        url: "/api/admin/details",
        method: "patch",
    },
    editPassword: {
        url: "/api/admin/password",
        method: "patch",
    },
    patient: {
        fetchPatients: {
            url: ({ _id, searchByFullName }) => {
                return `/api/admin/patient?${!_id ? "" : `_id=${_id}`}&${!searchByFullName ? "" : `searchByFullName=${searchByFullName}`
                    }`;
            },
            method: "get",
        },
        create: {
            url: "/api/admin/patient-create",
            method: "post",
        },
        editAccountDetails: {
            url: '/api/admin/patient-account',
            method: 'patch'
        },
        editGeneralDetails: {
            url: '/api/admin/patient-general',
            method: 'patch'
        },
        addPresentingComplaint: {
            url: '/api/admin/patient-presentingComplaint',
            method: 'post'
        },
        editPresentingComplaint: {
            url: '/api/admin/patient-presentingComplaint',
            method: 'patch'
        },
        deletePresentingComplaint: {
            url: '/api/admin/patient-presentingComplaint',
            method: 'delete'
        },
        addHistoryDetail: {
            url: '/api/admin/patient-history',
            method: 'post'
        },
        editHistoryDetail: {
            url: '/api/admin/patient-history',
            method: 'patch'
        },
        deleteHistoryDetail: {
            url: '/api/admin/patient-history',
            method: 'delete'
        },
        deletePatient: {
            url: '/api/admin/patient-delete',
            method: 'delete'
        }
    },
    logout: {
        url: "/api/admin/logout",
        method: "post",
    },
    deleteAccount: {
        url: "/api/admin/delete",
        method: "delete",
    },
};

routes.patient = {
    create: {
        url: "/api/patient/create",
        method: "post",
    },
    login: {
        url: "/api/patient/login",
        method: "post",
    },
    updateAccountDetails: {
        url: "/api/patient/accountDetails",
        method: "patch",
    },
    updateGeneralDetails: {
        url: "/api/patient/generalDetails",
        method: "patch",
    },
    editPassword: {
        url: "/api/patient/password",
        method: "patch",
    },
    addPresentingComplaint: {
        url: "/api/patient/presentingComplaint",
        method: "post",
    },
    editPresentingComplaint: {
        url: "/api/patient/presentingComplaint",
        method: "patch",
    },
    deletePresentingComplaint: {
        url: "/api/patient/presentingComplaint",
        method: "delete",
    },
    addHistoryDetail: {
        url: "/api/patient/history",
        method: "post",
    },
    editHistoryDetail: {
        url: "/api/patient/history",
        method: "patch",
    },
    deleteHistoryDetail: {
        url: "/api/patient/history",
        method: "delete",
    },
    logout: {
        url: "/api/patient/logout",
        method: "post",
    },
    deleteAccount: {
        url: "/api/patient/delete",
        method: "delete",
    },
};

routes.posts = {
    fetchPosts: {
        url: ({ postId }) => {
            return `/api/post${!postId ? "" : `?postId=${postId}`}`;
        },
        method: "get",
    },
    createNewPost: {
        url: "/api/post",
        method: "post",
    },
    editPost: {
        url: "/api/post",
        method: "patch",
    },
    deletePost: {
        url: "/api/post",
        method: "delete",
    },
};

export default routes;
