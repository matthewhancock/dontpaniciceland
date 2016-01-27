Imports Microsoft.VisualBasic
Public Class Util
    Public Shared Sub LoadToString(RelativePath As String, ByRef Text As String)
        Dim filename As String = HttpContext.Current.Server.MapPath(RelativePath)
        Using sr As New IO.StreamReader(filename)
            Text = sr.ReadToEnd()
        End Using
    End Sub
End Class
