GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


		CREATE PROC [dbo].[RelatedPersonalValues_Insert]
								@PersonalValueA int
								,@PersonalValueB int

		AS

/*------------ TEST CODE ------------

		DECLARE @PersonalValueA int = 3
				,@PersonalValueB int = 6
				
		EXECUTE [dbo].[RelatedPersonalValues_Insert]
								@PersonalValueA 
								,@PersonalValueB 

*/

		BEGIN

				INSERT INTO [dbo].[RelatedPersonalValues]
						   ([PersonalValueA]
						   ,[PersonalValueB])
					 VALUES
						   (@PersonalValueA
						   ,@PersonalValueB)


		END
GO
