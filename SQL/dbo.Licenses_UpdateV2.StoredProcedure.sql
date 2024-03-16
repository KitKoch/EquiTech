GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Licenses_UpdateV2]
			@LicenseStateId int
			,@LicenseNumber nvarchar(50)
			,@CreatedBy int
			,@DateVerified date
			,@IsActive bit
			,@LicenseName nvarchar(50)
			,@ExpirationDate date
			,@FileId int
			,@Id int


as

/*
Select *
From dbo.Licenses


Declare		@LicenseStateId int = 3
			,@LicenseNumber nvarchar(50) = 'V2testUpdate for Peer Review'
			,@CreatedBy int = 3
			,@DateVerified date
			,@IsActive bit = 1
			,@LicenseName nvarchar(50) = '111'
			,@ExpirationDate date = '01-01-2023'
			,@FileId int = 1
			,@Id int = 10


Execute [dbo].[Licenses_UpdateV2]
			@LicenseStateId
			,@LicenseNumber
			,@CreatedBy
			,@DateVerified
			,@IsActive
			,@LicenseName
			,@ExpirationDate
			,@FileId
			,@Id

Select *
From dbo.Licenses

*/

BEGIN


UPDATE [dbo].[Licenses]
SET			[LicenseStateId] = @LicenseStateId
			,[LicenseNumber] = @LicenseNumber
			,[CreatedBy] = @CreatedBy
			,[DateVerified] = COALESCE(@DateVerified, NULL)
			,[IsActive] = @IsActive
			,[LicenseName] = @LicenseName
			,[ExpirationDate] = @ExpirationDate
			,[FileId] = @FileId


WHERE		[Id] = @Id


END
GO
