GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	
CREATE PROCEDURE [dbo].[InviteMembers_Insert]
		@FirstName nvarchar(100)
		,@LastName nvarchar(100)
		,@Email nvarchar(255) = null
		,@Token nvarchar(500) = null
		,@UserRoleTypeId int
		,@OrganizationId int
		,@CreatedBy int
		,@Id int OUTPUT
AS
/*
	
	DECLARE
		@FirstName nvarchar(100) = 'Sat'
		,@LastName nvarchar(100) = 'Sal'
		,@Email nvarchar(255)
		,@Token nvarchar(500) 
		,@UserRoleTypeId int = 3
		,@OrganizationId int = 12
		,@CreatedBy int = 10
		,@Id int
	EXECUTE dbo.[InviteMembers_Insert]
		@FirstName
		,@LastName
		,@Email
		,@Token 
		,@UserRoleTypeId
		,@OrganizationId
		,@CreatedBy
		,@Id OUTPUT

		SELECT * FROM  dbo.[InviteMembers]

*/
BEGIN
		INSERT INTO dbo.[InviteMembers]
			([FirstName]
			,[LastName]
			,[Email]
			,[Token]
			,[UserRoleTypeId]
			,[OrganizationId]
			,[CreatedBy])
		VALUES
			(@FirstName
			,@LastName
			,@Email
			,@Token
			,@UserRoleTypeId
			,@OrganizationId
			,@CreatedBy)
				
		SET @Id = SCOPE_IDENTITY();
END
GO
