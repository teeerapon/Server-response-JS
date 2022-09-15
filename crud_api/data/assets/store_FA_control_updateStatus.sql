exec [dbo].[FA_Control_updateStatus]
    @usercode ,
	@nac_code,
	@nac_status,
    @nac_type,

    @source,
	@sourceDate,

	@des_delivery,
	@des_deliveryDate,

	-- Headers ต้นทาง
	@source_approve,
	@source_approve_date,

	-- Headers ปลายทาง
	@des_approve ,
	@des_approve_date,

	@verify_by,
	@verify_date,
	@new_Price -- ราคาจริง