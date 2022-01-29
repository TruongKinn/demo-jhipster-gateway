package vn.com.java.service.mapper;

import org.mapstruct.*;
import vn.com.java.domain.Department;
import vn.com.java.service.dto.DepartmentDTO;

/**
 * Mapper for the entity {@link Department} and its DTO {@link DepartmentDTO}.
 */
@Mapper(componentModel = "spring", uses = { LocationMapper.class })
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {
    @Mapping(target = "location", source = "location", qualifiedByName = "id")
    DepartmentDTO toDto(Department s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DepartmentDTO toDtoId(Department department);
}
