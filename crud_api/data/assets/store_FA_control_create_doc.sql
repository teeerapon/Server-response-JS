exec [dbo].[FA_Control_Create_Document_NAC]
-- Add the parameters for the stored procedure here
	@usercode,--user ที่ทำรายการขออนุมัติ
	@worktype,--ประเภทงานย่อย เช่น NAC สำหรับผู้ส่งมอบ
	@sumPrice, -- เงินรวมของรายการ

	-- Headers ปลายทาง
	@des_Department,
	@des_BU,
	@des_delivery,
	@des_deliveryDate,
	@des_Description,

	-- Headers ต้นทาง
	@source_Department,
	@source_BU,
	@source,
	@sourceDate,
	@source_Description