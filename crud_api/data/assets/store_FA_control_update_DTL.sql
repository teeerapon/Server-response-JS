exec [TEST_OPS].[dbo].[FA_Control_Update_DTL]
    @dtl_id, -- (-1 = Edit), (0 = New) 
	@usercode,--user ที่ทำรายการขออนุมัติ
	@nac_code,
	@nacdtl_row, -- แถวของ Detail
    @nacdtl_assetsCode, -- assets code
    @nacdtl_assetsName, -- assets name
    @nacdtl_assetsSeria, -- assets seria
    @nacdtl_assetsDtl, -- assets dtl
    @nacdtl_assetsCount, -- assets count
    @nacdtl_assetsPrice,  -- assets price
    @asset_id  -- assets price