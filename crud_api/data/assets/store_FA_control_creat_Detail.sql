exec [dbo].[FA_Control_Create_Detail_NAC]
	@usercode,--user ที่ทำรายการขออนุมัติ
	@nac_code,
	@nacdtl_row, -- แถวของ Detail
    @nacdtl_assetsCode, -- assets code
    @nacdtl_assetsName, -- assets name
    @nacdtl_assetsSeria, -- assets seria
    @nacdtl_assetsDtl, -- assets dtl
    @nacdtl_assetsCount, -- assets count
    @nacdtl_assetsPrice,-- assets price
    @nacdtl_date_asset