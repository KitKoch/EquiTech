GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_Insert]
					@Email nvarchar(255)
					,@FirstName nvarchar(100)
					,@LastName nvarchar(100)
					,@Mi nvarchar(2)
					,@AvatarUrl varchar(255)
					,@Password varchar(100)
					,@StatusId int
					,@IsProfileViewable bit

					,@Id int OUTPUT
			

AS
/*---------------- TEST CODE -----------------

	DECLARE			@Id int

	DECLARE			@Email nvarchar(255) = 'TestInsert2@test.com'
					,@FirstName nvarchar(100) = 'Test'
					,@LastName nvarchar(100) = 'User'
					,@Mi nvarchar(2) = 'A'
					,@AvatarUrl varchar(255) = 'url.com'
					,@Password varchar(100) = 'Password'
					,@StatusId int = '1'
					,@IsProfileViewable bit = 'True'

	EXECUTE dbo.Users_Insert
					@Email
					,@FirstName
					,@LastName
					,@Mi
					,@AvatarUrl
					,@Password
					,@StatusId
					,@IsProfileViewable

					,@Id OUTPUT

		EXECUTE dbo.Users_Select_ById @Id

*/
BEGIN

	INSERT INTO [dbo].[Users]
					([Email]
					,[FirstName]
					,[LastName]
					,[Mi]
					,[AvatarUrl]
					,[Password]
					,[StatusId]
					,[IsProfileViewable])
     VALUES
					(@Email
					,@FirstName
					,@LastName
					,@Mi
					,@AvatarUrl
					,@Password
					,@StatusId
					,@IsProfileViewable)
	SET				
					@Id = SCOPE_IDENTITY()

END

GO
