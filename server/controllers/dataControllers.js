import adminModel from "../models/adminModel.js";

export const getAdminData = async (req, res) => {
    try {
        const adminId = req.adminId;

        const admin = await adminModel.findById(adminId);

        if (!admin) {
            return res.json({
                success: false,
                message: "admin not found"
            });
        }

        res.json({
            success: true,
            adminData: {
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}