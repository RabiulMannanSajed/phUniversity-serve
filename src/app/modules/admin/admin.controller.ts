import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { adminServices } from './admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdminFromDb(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.getSingleAdminFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin } = req.body;
  const result = await adminServices.updateAdminFromDb(adminId, admin);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.deleteAdminFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});
export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
