exec [dbo].[FA_Control_Update_DTLandHEADERS]
	@usercode,--user ที่ทำรายการขออนุมัติ
	@nac_code,--nac code
	@nac_status,--สถานะการทำรายการ
	@sumPrice, -- เงินรวมของรายการ
	@nac_type,

	-- Headers ปลายทาง
	@des_department,
	@des_BU,
	@des_delivery,
	@des_deliveryDate,
	@des_description,

	-- Headers ต้นทาง
	@source_department,
	@source_BU,
	@source ,
	@sourceDate,
	@source_description