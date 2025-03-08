import UpdateResourceModule from '@/modules/Resource/Update'

const UpdateResourcePage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params

    return (
        <>
            <UpdateResourceModule id={id} />
        </>
    )
}

export default UpdateResourcePage
