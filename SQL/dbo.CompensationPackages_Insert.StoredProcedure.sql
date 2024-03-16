GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[CompensationPackages_Insert]
	@OrgId  int,
	@Name nvarchar(100),
	@Description nvarchar(500),
	@BaseSalary nvarchar(100),
	@CreatedBy int,
	@ModifiedBy int,
	@Id int OUTPUT
as

/* ----- Test Code -----
	
	Declare @Id int = 0,

	@OrgId int = 1,
	@Name nvarchar(100) = 'Senior Developer Package',
	@Description nvarchar(500) = '401k, $3,000 Sign-On Bonus',
	@BaseSalary nvarchar(100) = '$110k'
	@CreatedBy int = 3,
	@ModifiedBy int = 7
	
	Execute [dbo].[CompensationPackages_Insert] 

	@OrgId,
	@Name,
	@Description,
	@BaseSalary,
	@CreatedBy,
	@ModifiedBy,
	@Id OUTPUT
	

	Select * 
	from dbo.CompensationPackages
	Where Id = @Id	

*/

BEGIN

	Insert into [dbo].[CompensationPackages]
	([OrgId],
	 [Name],
	 [Description],
	 [BaseSalary],
	 [CreatedBy],
	 [ModifiedBy]) 
	 
	 VALUES

   (@OrgId,
	@Name,
	@Description,
	@BaseSalary,
	@CreatedBy,
	@ModifiedBy)
	
	SET @Id = SCOPE_IDENTITY()

END
GO
