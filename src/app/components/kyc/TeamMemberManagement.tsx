import React, { useState } from 'react';
import { 
  UserPlus, 
  Users, 
  Shield, 
  Edit2, 
  Trash2, 
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Crown,
  Star,
  UserCheck,
  MoreVertical
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export type MemberRole = 'owner' | 'admin' | 'manager' | 'supervisor' | 'staff' | 'viewer';
export type MemberStatus = 'active' | 'pending' | 'suspended' | 'invited';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: MemberRole;
  status: MemberStatus;
  permissions: string[];
  joinedDate: Date;
  lastActive?: Date;
  invitedBy?: string;
}

interface TeamMemberManagementProps {
  entityType: string;
  maxMembers: number;
  currentMembers?: TeamMember[];
  onMembersChange: (members: TeamMember[]) => void;
}

const roleConfig: Record<MemberRole, {
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  permissions: string[];
  description: string;
}> = {
  owner: {
    label: 'Owner',
    icon: <Crown className="w-4 h-4" />,
    color: '#FFD700',
    bgColor: 'rgba(255, 215, 0, 0.15)',
    permissions: ['all'],
    description: 'Full access to all features and settings',
  },
  admin: {
    label: 'Administrator',
    icon: <Shield className="w-4 h-4" />,
    color: '#E74C3C',
    bgColor: 'rgba(231, 76, 60, 0.15)',
    permissions: ['manage_users', 'manage_documents', 'manage_lots', 'view_reports', 'manage_settings'],
    description: 'Can manage users, documents, and settings',
  },
  manager: {
    label: 'Manager',
    icon: <Star className="w-4 h-4" />,
    color: '#2F80ED',
    bgColor: 'rgba(47, 128, 237, 0.15)',
    permissions: ['manage_lots', 'view_reports', 'manage_documents'],
    description: 'Can manage lots and documents',
  },
  supervisor: {
    label: 'Supervisor',
    icon: <UserCheck className="w-4 h-4" />,
    color: '#27AE60',
    bgColor: 'rgba(39, 174, 96, 0.15)',
    permissions: ['view_lots', 'update_lots', 'view_reports'],
    description: 'Can view and update lots',
  },
  staff: {
    label: 'Staff',
    icon: <Users className="w-4 h-4" />,
    color: '#8B9AA8',
    bgColor: 'rgba(139, 154, 168, 0.15)',
    permissions: ['view_lots', 'view_documents'],
    description: 'Can view lots and documents',
  },
  viewer: {
    label: 'Viewer',
    icon: <Users className="w-4 h-4" />,
    color: '#C4CDD5',
    bgColor: 'rgba(196, 205, 213, 0.15)',
    permissions: ['view_lots'],
    description: 'Read-only access',
  },
};

export const TeamMemberManagement: React.FC<TeamMemberManagementProps> = ({
  entityType,
  maxMembers,
  currentMembers = [],
  onMembersChange,
}) => {
  const [members, setMembers] = useState<TeamMember[]>(currentMembers);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff' as MemberRole,
  });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      alert('Name and email are required');
      return;
    }

    if (members.length >= maxMembers) {
      alert(`Maximum ${maxMembers} members allowed for ${entityType}`);
      return;
    }

    const member: TeamMember = {
      id: `member-${Date.now()}`,
      name: newMember.name,
      email: newMember.email,
      phone: newMember.phone,
      role: newMember.role,
      status: 'invited',
      permissions: roleConfig[newMember.role].permissions,
      joinedDate: new Date(),
    };

    const updatedMembers = [...members, member];
    setMembers(updatedMembers);
    onMembersChange(updatedMembers);

    setNewMember({ name: '', email: '', phone: '', role: 'staff' });
    setShowAddDialog(false);
  };

  const handleRemoveMember = (id: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      const updatedMembers = members.filter(m => m.id !== id);
      setMembers(updatedMembers);
      onMembersChange(updatedMembers);
    }
  };

  const handleRoleChange = (id: string, newRole: MemberRole) => {
    const updatedMembers = members.map(m =>
      m.id === id
        ? { ...m, role: newRole, permissions: roleConfig[newRole].permissions }
        : m
    );
    setMembers(updatedMembers);
    onMembersChange(updatedMembers);
  };

  const handleStatusChange = (id: string, newStatus: MemberStatus) => {
    const updatedMembers = members.map(m =>
      m.id === id ? { ...m, status: newStatus } : m
    );
    setMembers(updatedMembers);
    onMembersChange(updatedMembers);
  };

  const getStatusColor = (status: MemberStatus) => {
    switch (status) {
      case 'active': return '#27AE60';
      case 'pending': return '#E2B93B';
      case 'invited': return '#2F80ED';
      case 'suspended': return '#E74C3C';
      default: return '#8B9AA8';
    }
  };

  const roleStats = Object.entries(
    members.reduce((acc, m) => {
      acc[m.role] = (acc[m.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 
              className="mb-2"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#003E6D'
              }}
            >
              Team Member Management
            </h2>
            <p 
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A'
              }}
            >
              Manage up to {maxMembers} team members with role-based access control
            </p>
          </div>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button
                className="gap-2"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                  color: '#003E6D',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  border: 'none',
                }}
              >
                <UserPlus className="w-5 h-5" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}>
                  Add Team Member
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      color: '#003E6D',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Full Name *
                  </label>
                  <Input
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      color: '#003E6D',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      color: '#003E6D',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      color: '#003E6D',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Role
                  </label>
                  <Select value={newMember.role} onValueChange={(value: MemberRole) => setNewMember({ ...newMember, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roleConfig).filter(([key]) => key !== 'owner').map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            {config.icon}
                            {config.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-1" style={{ fontFamily: 'Lato, sans-serif', color: '#8B9AA8', fontSize: '0.75rem' }}>
                    {roleConfig[newMember.role].description}
                  </p>
                </div>

                <Button
                  onClick={handleAddMember}
                  className="w-full"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                    color: '#003E6D',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <Card className="p-6" style={{ borderRadius: '16px' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div 
                className="mb-1"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#003E6D',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                }}
              >
                {members.length}/{maxMembers}
              </div>
              <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.75rem' }}>
                Total Members
              </div>
            </div>

            <div>
              <div 
                className="mb-1"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#27AE60',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                }}
              >
                {members.filter(m => m.status === 'active').length}
              </div>
              <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.75rem' }}>
                Active
              </div>
            </div>

            <div>
              <div 
                className="mb-1"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#2F80ED',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                }}
              >
                {members.filter(m => m.status === 'invited').length}
              </div>
              <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.75rem' }}>
                Pending
              </div>
            </div>

            <div>
              <div 
                className="mb-1"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#FFD700',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                }}
              >
                {maxMembers - members.length}
              </div>
              <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.75rem' }}>
                Slots Available
              </div>
            </div>
          </div>

          {roleStats.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[rgba(0,62,109,0.1)]">
              <div className="flex flex-wrap gap-2">
                {roleStats.map(([role, count]) => (
                  <div
                    key={role}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{ background: roleConfig[role as MemberRole].bgColor }}
                  >
                    {roleConfig[role as MemberRole].icon}
                    <span style={{ fontFamily: 'Montserrat, sans-serif', color: roleConfig[role as MemberRole].color, fontSize: '0.875rem', fontWeight: 600 }}>
                      {roleConfig[role as MemberRole].label}: {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {members.length === 0 ? (
          <Card 
            className="p-12 text-center"
            style={{ borderRadius: '24px', border: '2px dashed rgba(0,62,109,0.2)' }}
          >
            <Users className="w-16 h-16 mx-auto mb-4" style={{ color: '#8B9AA8' }} />
            <h3 
              className="mb-2"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#003E6D',
              }}
            >
              No Team Members Yet
            </h3>
            <p 
              className="mb-4"
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A',
              }}
            >
              Add team members to collaborate and manage your operations
            </p>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="gap-2"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                color: '#003E6D',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
              }}
            >
              <UserPlus className="w-5 h-5" />
              Add First Member
            </Button>
          </Card>
        ) : (
          members.map((member) => (
            <Card 
              key={member.id}
              className="p-5 hover:shadow-lg transition-shadow"
              style={{ borderRadius: '16px' }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: roleConfig[member.role].bgColor,
                    color: roleConfig[member.role].color,
                  }}
                >
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 
                      className="truncate"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        color: '#003E6D',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                      }}
                    >
                      {member.name}
                    </h4>
                    <Badge
                      className="px-2 py-0.5 text-xs"
                      style={{
                        background: roleConfig[member.role].bgColor,
                        color: roleConfig[member.role].color,
                        border: 'none',
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                    >
                      {roleConfig[member.role].icon}
                      <span className="ml-1">{roleConfig[member.role].label}</span>
                    </Badge>
                    <Badge
                      className="px-2 py-0.5 text-xs"
                      style={{
                        background: `${getStatusColor(member.status)}15`,
                        color: getStatusColor(member.status),
                        border: 'none',
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                    >
                      {member.status === 'active' && <CheckCircle2 className="w-3 h-3 mr-1 inline-block" />}
                      {member.status === 'suspended' && <XCircle className="w-3 h-3 mr-1 inline-block" />}
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    {member.email && (
                      <span className="flex items-center gap-1" style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A' }}>
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </span>
                    )}
                    {member.phone && (
                      <span className="flex items-center gap-1" style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A' }}>
                        <Phone className="w-3 h-3" />
                        {member.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {member.permissions.slice(0, 3).map((perm, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          background: 'rgba(0,62,109,0.05)',
                          fontFamily: 'Lato, sans-serif',
                          color: '#5A6B7A',
                        }}
                      >
                        {perm.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {member.permissions.length > 3 && (
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          background: 'rgba(0,62,109,0.05)',
                          fontFamily: 'Lato, sans-serif',
                          color: '#5A6B7A',
                        }}
                      >
                        +{member.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {member.role !== 'owner' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => {
                        const newRole = prompt('Select new role (admin/manager/supervisor/staff/viewer):') as MemberRole;
                        if (newRole && roleConfig[newRole]) {
                          handleRoleChange(member.id, newRole);
                        }
                      }}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Change Role
                      </DropdownMenuItem>
                      {member.status === 'active' && (
                        <DropdownMenuItem onClick={() => handleStatusChange(member.id, 'suspended')}>
                          <XCircle className="w-4 h-4 mr-2" />
                          Suspend
                        </DropdownMenuItem>
                      )}
                      {member.status === 'suspended' && (
                        <DropdownMenuItem onClick={() => handleStatusChange(member.id, 'active')}>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Activate
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamMemberManagement;
